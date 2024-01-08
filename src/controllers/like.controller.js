import { ApiResponse } from "../utils/ApiResponse.js"
import mongoose, { isValidObjectId } from "mongoose.js"
import { ApiError } from "../utils/ApiErrors.js"
import asyncHandler from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params.videoId
})

const toggleCommentLike = asyncHandler(async (req, res) => {})

const toggleTweetLike = asyncHandler(async (req, res) => {})

const getLikedVideos = asyncHandler(async (req, res) => {})

export { toggleTweetLike, toggleVideoLike, toggleCommentLike, geLikedVideos }
