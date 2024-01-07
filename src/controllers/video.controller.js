import mongoose, { isValidObjectId } from "mongoose"
import mongoose from "mongoose"
import { ApiError } from "../utils/ApiErrors"
import { ApiResponse } from "../utils/ApiResponse"
import asyncHandler from "../utils/asyncHandler"
import { uploadOnCloudinary } from "../utils/cloudinary"

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
