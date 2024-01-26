import mongoose from "mongoose"
import { Tweet } from "../models/tweets.model.js"
import { User } from "../models/users.model.js"
import { ApiError } from "../utils/ApiErrors.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
  const { content } = req.body

  if (!content) {
    throw new ApiError(400, "Tweets can't be empty!")
  }

  const userId = req.user?._id

  const tweet = await Tweet.create({
    owner: userId,
    content: content,
  })

  if (!tweet) {
    throw new ApiError(500, "Error creating post!")
  }

  return res
    .status(200)
    .json(new ApiResponse(201, tweet, "Post created successfully!"))
})

const getUserTweets = asyncHandler(async (req, res) => {
  const { userId } = req.params

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid userId!")
  }

  const userTweets = await Tweet.find({ owner: userId })

  if (userTweets.length === 0) {
    return res.status(200).json(new ApiResponse(204, [], "No posts found!"))
  }

  return res
    .status(200)
    .json(new ApiResponse(200, userTweets, "User tweets successfully fetched!"))
})

const updateTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params
  const { content } = req.body

  if (!mongoose.Types.ObjectId.isValid(tweetId)) {
    throw new ApiError(400, "Invalid tweetId!")
  }

  const updatedTweet = await Tweet.findByIdAndUpdate(
    tweetId,
    {
      content: content,
    },
    { new: true }
  )

  if (!updatedTweet) {
    throw new ApiError(200, "Error while updating post!")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedTweet, "Post updated successfully!"))
})

const deleteTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params

  if (!mongoose.Types.ObjectId.isValid(tweetId)) {
    throw new ApiError(400, "Invalid tweetId!")
  }
  const response = await Tweet.findByIdAndDelete(tweetId, { new: true })

  if (!response) {
    throw new ApiError(500, "Error while deleting the post!")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, response, "Successfully deleted the post!"))
})

export { createTweet, getUserTweets, updateTweet, deleteTweet }
