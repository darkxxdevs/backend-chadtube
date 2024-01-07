import mongoose from "mongoose"
import { ApiError } from "../utils/ApiErrors"
import { ApiResponse } from "../utils/ApiResponse"
import { Like } from "../models/likes.model"
import asyncHandler from "../utils/asyncHandler"

const getChannelStats = asyncHandler(async (req, res) => {})

const getChannelVideos = asyncHandler(async (req, res) => {})

export { getChannelStats, getChannelVideos }
