import fs from "fs"
import { v2 as cloudinary } from "cloudinary"
import { extractPublicId } from "cloudinary-build-url"

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
  return extractPublicId(publicUrl)
}

const deleteFromCloudinary = async (resourceId, resourceType) => {
  try {
    if (!resourceId) return null

    const response = await cloudinary.uploader.destroy(resourceId, {
      type: "upload",
      resource_type: resourceType,
    })

    // console.log("Cloudinary Deletion Response:", response)

    return response
  } catch (error) {
    console.log(
      `Error occurred while deleting the resource: ${JSON.stringify(
        error,
        null,
        2
      )}`
    )
    throw error
  }
}

export { uploadOnCloudinary, deleteFromCloudinary, getPublicIdFromUrl }
