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

    console.log("Upload successful!", response.url)

    fs.unlinkSync(localFIlePath)

    return response
  } catch (error) {
    fs.unlinkSync(localFIlePath) // removing the file from the local storage if the upload failed
    return null
  }
}

export { uploadOnCloudinary }
