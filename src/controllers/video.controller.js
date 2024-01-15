import { ApiError } from "../utils/ApiErrors.js"
import mongoose from "mongoose"
import { ApiResponse } from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import {
  uploadOnCloudinary,
  getPublicIdFromUrl,
  deleteFromCloudinary,
} from "../utils/cloudinary.js"
import { Video } from "../models/videos.model.js"

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType } = req.body

  const pipeLine = []

  if (query) {
    pipeLine.push({
      $match: {
        title: { $regex: new RegExp(query, "i") },
      },
    })
  }

  const sortOrder = sortType === "desc" ? -1 : 1

  if (sortBy) {
    const sortStage = {}
    sortStage[sortBy] = sortOrder
    pipeLine.push({
      $sort: { sortStage },
    })
  }

  const skip = (page - 1) * limit
  pipeLine.push({ $skip: skip }, { $limit: parseInt(limit) })

  const videos = await Video.aggregate(pipeLine)

  if (videos.length === 0) {
    return res
      .status(204)
      .json(new ApiResponse(204, [], "No videos found for the search!"))
  }

  return res.status(200).json(200, videos, "Video results found!")
})

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body

  if (!title || !description) {
    throw new ApiError(400, "Both title and description are required!")
  }

  const videoFileLocalPath = req.files.videoFile[0].path
  const thumbnailLocalPath = req.files.thumbnail[0].path

  if (!videoFileLocalPath) {
    throw new ApiError("video path not found!")
  }

  if (!thumbnailLocalPath) {
    throw new ApiError("thumbnail path not found!")
  }

  const videoFile = await uploadOnCloudinary(videoFileLocalPath)
  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

  if (!videoFile || !thumbnail) {
    throw new ApiError(500, "Both video and avatar are required!")
  }

  const owner = req.user?._id

  const newVideo = await Video.create({
    videoFile: videoFile,
    thumbnail: thumbnail,
    owner: owner,
    title: title,
    description: description,
  })

  if (!newVideo) {
    throw new ApiError(500, "Something went wrong while adding the video!")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, newVideo, "Video added successfully!"))
})

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new ApiError(400, "Invalid video id!")
  }

  const video = await Video.findById(videoId)

  if (!videoId) {
    throw new ApiError(500, "Error while fetching the video with the given id!")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video fetched successfully!"))
})

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params

  if (mongoose.Types.ObjectId.isValid(videoId)) {
    throw new ApiError(400, "Invalid video id!")
  }

  const { title, description } = req.body

  const thumbnailLocalPath = req.file ? req.file.thumbnail : undefined

  if (!title && !description && !thumbnailLocalPath) {
    throw new ApiError(400, "Error no data provided for updation!")
  }

  const video = await Video.findById(videoId)

  let updateObject = {}

  if (thumbnailLocalPath) {
    const oldThumbnailPublicId = getPublicIdFromUrl(video.thumbnail)

    const response = await deleteFromCloudinary(oldThumbnailPublicId)

    // check for the response through console log remove it later on

    console.log(response)
    if (!response) {
      throw new ApiError(500, "Error while deleting the older thumbnail!")
    }

    const newthumbnail = await uploadOnCloudinary(thumbnailLocalPath)

    if (!newthumbnail) {
      throw new ApiError(500, "Error while uploading thumbnail!")
    }

    updateObject.thumbnail = newthumbnail
  }

  if (title) {
    updateObject.title = title
  }

  if (description) {
    updateObject.description = description
  }

  const updatedVideoData = await Video.findByIdAndUpdate(
    videoId,
    updateObject,
    {
      new: true,
    }
  )

  if (!updatedVideoData) {
    throw new ApiError(500, "Error occured while updating data in db!")
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedVideoData, "thumbnail updated successfully!")
    )
})

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new ApiError(400, "Invalid video id!")
  }

  const deletedVideo = await Video.findByIdAndDelete(videoId)

  if (!deleteVideo) {
    throw new ApiError(500, "Error deleting video !")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deleteVideo, "Video deleted successFully!"))
})

const togglePublishStatus = asyncHandler(async (req, res) => {})

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
}
