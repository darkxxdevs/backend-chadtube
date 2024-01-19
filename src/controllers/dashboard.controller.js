import mongoose from "mongoose"
import { ApiError } from "../utils/ApiErrors.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Like } from "../models/likes.model.js"
import { Video } from "../models/videos.model.js"
import asyncHandler from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
  const user = req.user

  const videos = await Video.aggregate([
    {
      $group: {
        _id: "$owner",
        Count: {
          $sum: 1,
        },
      },
    },
  ])
})

const getChannelVideos = asyncHandler(async (req, res) => {
  const user = req.user

  if (!user) {
    throw new ApiError(400, "Unauthorized request!")
  }

  const userVideos = await Video.find({
    owner: user._id,
  })

  if (userVideos.length === 0) {
    return res
      .status(204)
      .json(new ApiResponse(204, [], "no videos so far ...."))
  }

  return res
    .status(200)
    .json(new ApiResponse(200, userVideos, "video fetch successful!"))
})

export { getChannelStats, getChannelVideos }
