import { ApiResponse } from "../utils/ApiResponse"
import mongoose, { isValidObjectId } from "mongoose"
import { ApiError } from "../utils/ApiErrors"
import asyncHandler from "../utils/asyncHandler"

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params.videoId
})

const toggleCommentLike = asyncHandler(async (req, res) => {})

const toggleTweetLike = asyncHandler(async (req, res) => {})

const geLikedVideos = asyncHandler(async (req, res) => {})

export { toggleTweetLike, toggleVideoLike, toggleCommentLike, geLikedVideos }
