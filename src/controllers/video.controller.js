import mongoose, { isValidObjectId } from "mongoose"
import mongoose from "mongoose"
import { ApiError } from "../utils/ApiErrors.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const getAllVideos = asyncHandler(async (req, res) => {})

const publishAVideo = asyncHandler(async (req, res) => {})

const getVideoById = asyncHandler(async (req, res) => {})

const updateVideo = asyncHandler(async (req, res) => {})

const deleteVideo = asyncHandler(async (req, res) => {})

const togglePublishStatus = asyncHandler(async (req, res) => {})

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
}
