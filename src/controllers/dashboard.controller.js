import { ApiError } from "../utils/ApiErrors.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Video } from "../models/videos.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import { User } from "../models/users.model.js"

const getChannelStats = asyncHandler(async (req, res) => {
  const user = req.user

  const userStats = await User.aggregate([
    {
      $match: {
        _id: user._id,
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "_id",
        foreignField: "owner",
        as: "uploads",
      },
    },
    {
      $addFields: {
        numberOfUploads: {
          $size: "$uploads",
        },
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subscriptions",
      },
    },
    {
      $addFields: {
        subscriberCount: {
          $size: "$subscriptions",
        },
      },
    },
    {
      $lookup: {
        from: "tweets",
        localField: "_id",
        foreignField: "owner",
        as: "tweets",
      },
    },
    {
      $addFields: {
        tweetCount: {
          $size: "$tweets",
        },
      },
    },
    {
      $project: {
        subscriberCount: 1,
        username: 1,
        numberOfUploads: 1,
        coverImage: 1,
        avatar: 1,
        tweetCount: 1,
        email: 1,
        views: 1,
      },
    },
  ])

  const performanceStats = await Video.aggregate([
    {
      $match: {
        owner: user._id,
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "video",
        as: "videolikes",
      },
    },
    {
      $addFields: {
        numberOfLikes: {
          $size: "$videolikes",
        },
      },
    },
    {
      $group: {
        _id: null,
        lifeTimeLikes: {
          $sum: "$numberOfLikes",
        },
        lifeTimeViews: {
          $sum: "$views",
        },
      },
    },
    {
      $project: {
        _id: 0,
        lifeTimeLikes: 1,
        lifeTimeViews: 1,
      },
    },
  ])

  if (!userStats && !performanceStats) {
    throw new ApiError(500, "Error while fetching channel stats")
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { userStats: userStats, videoPerformaceStats: performanceStats },
        "Channel stats fetched successfully!"
      )
    )
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
