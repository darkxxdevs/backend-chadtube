import { ApiResponse } from "../utils/ApiResponse.js"
import mongoose, { isValidObjectId } from "mongoose"
import { ApiError } from "../utils/ApiErrors.js"
import { Like } from "../models/likes.model.js"
import asyncHandler from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new ApiError(400, "Invalid video id!")
  }

  const userId = req.user?._id

  const like = await Like.findOne({
    $and: [{ likedBy: userId }, { video: videoId }],
  })

  if (!like) {
    const response = await Like.create({
      video: videoId,
      likedBy: userId,
    })

    if (!response) {
      throw new ApiError(500, "Error adding like!")
    }

    return res
      .status(200)
      .json(new ApiResponse(200, response, "Successfully liked the video!"))
  }

  const removedLike = await Like.deleteOne({
    $and: [{ video: videoId }, { likedBy: userId }],
  })

  if (!removedLike) {
    throw new ApiError(500, "Error removing the like!")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Like removed successfully!"))
})

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params
  const userId = req.user?._id

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new ApiError(400, "Invalid comment id ! ")
  }

  const like = await Like.findOne({
    $and: [{ comment: commentId }, { likedBy: userId }],
  })

  if (!like) {
    const response = await Like.create({
      comment: commentId,
      likedBy: userId,
    })

    if (!response) {
      throw new ApiError(200, "Error while adding like!")
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, { info: response }, "Successfully added the like!")
      )
  }

  const response = await Like.deleteOne({
    $and: [{ comment: commentId }, { likedBy: userId }],
  })

  if (!response) {
    throw new ApiError(500, "Error removing like!")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Like successfully deleted!"))
})

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params

  const userId = req.user?._id

  if (!mongoose.Types.ObjectId.isValid(tweetId)) {
    throw new ApiError(400, "Ivalid tweet Id !")
  }

  const like = await Like.findOne({
    $and: [{ tweet: tweetId }, { likedBy: userId }],
  })

  if (!like) {
    const response = await Like.create({
      tweet: tweetId,
      likedBy: userId,
    })

    if (!response) {
      throw new ApiError(500, "Error adding like!")
    }

    return res
      .status(200)
      .json(new ApiResponse(200, { response }, "successFully added like!"))
  }

  const response = await Like.deleteOne({
    $and: [{ tweet: tweetId }, { likedBy: userId }],
  })

  if (!response) {
    throw new ApiError(500, "Error adding like!")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Successfully deleted like!"))
})

const getLikedVideos = asyncHandler(async (req, res) => {
  const userId = req.user?._id

  const likedVideos = await Like.find({
    likedBy: userId,
    video: {
      $exists: true,
    },
  })

  if (likedVideos.length === 0) {
    return res
      .status(204)
      .json(new ApiResponse(204, [], "No liked videos so far!"))
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, likedVideos, "Successfully fetched liked  videos !")
    )
})

export { toggleTweetLike, toggleVideoLike, toggleCommentLike, getLikedVideos }
