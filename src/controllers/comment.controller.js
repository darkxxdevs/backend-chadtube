import mongoose from "mongoose"
import { ApiError } from "../utils/ApiErrors.js"
import { Comment } from "../models/comments.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res, next) => {
  const { videoId } = req.params

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new ApiError(400, "Invalid video id type!")
  }

  const comments = await Comment.find({ video: videoId })

  if (comments.length === 0) {
    res.status(200).json(new ApiResponse(200, comments, "No comments found!"))
  }

  res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments fetch sucessful!"))
})

const addComment = asyncHandler(async (req, res) => {
  const videoId = req.params.videoId
  const { content } = req.body

  const ownerId = req.user?._id

  if (!content) {
    throw new ApiError(400, "Comments can't be empty!")
  }
  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new ApiError(400, "Invaild video id!")
  }

  const comment = await Comment.create({
    video: videoId,
    owner: ownerId,
    content: content,
  })

  if (!comment) {
    throw new ApiError(500, "Error while creating comment!")
  }

  res.status(201).json(new ApiResponse(201, { comment }, "Comment created!"))
})

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new ApiError(400, "Invalid comment id!")
  }

  const comment = await Comment.findById(commentId)

  if (!comment) {
    throw new ApiError(404, "comment not found!")
  }

  await Comment.deleteOne({ _id: commentId })

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Comment deleted successfully!"))
})

const updateComment = asyncHandler(async (req, res) => {
  const { newContent } = req.body
  const { commentId } = req.params

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new ApiError(400, "Invalid comment id !")
  }

  const comment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: {
        content: newContent,
        isEdited: true,
      },
    },
    { new: true }
  )

  if (!comment) {
    throw new ApiError(500, "Error while updating comment!")
  }

  res
    .status(200)
    .json(new ApiResponse(200, { comment }, "comment updated successfully!"))
})

export { getVideoComments, deleteComment, addComment, updateComment }
