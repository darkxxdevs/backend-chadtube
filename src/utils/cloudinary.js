import fs from "fs"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadOnCloudinary = async (localFIlePath) => {
  try {
    if (!localFIlePath) return null

    // uploading process for cloudinary
    const response = await cloudinary.uploader.upload(localFIlePath, {
      resource_type: "auto",
    })

    fs.unlinkSync(localFIlePath)

    return response
  } catch (error) {
    fs.unlinkSync(localFIlePath) // removing the file from the local storage if the upload failed
    return null
  }
}

const getPublicIdFromUrl = (publicUrl) => {
  const match = publicUrl.match(/\/upload\/(.+?)\//)
  return match ? match[1] : null
}

const deleteFromCloudinary = async (assetPublicId) => {
  try {
    if (!assetPublicId) return null

    const response = await cloudinary.api.delete_resources([assetPublicId])

    return response
  } catch (error) {
    console.log(`Error occured while deleting the resource; ${error}`)
    return null
  }
}

export { uploadOnCloudinary, deleteFromCloudinary, getPublicIdFromUrl }
