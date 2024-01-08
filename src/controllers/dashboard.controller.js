import mongoose from "mongoose"
import { ApiError } from "../utils/ApiErrors.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Like } from "../models/likes.model.js"
import asyncHandler from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {})

const getChannelVideos = asyncHandler(async (req, res) => {})

export { getChannelStats, getChannelVideos }
