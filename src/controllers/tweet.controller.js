import mongoose, { isValidObjectId } from "mongoose"
import { Tweet } from "../models/tweets.model"
import { User } from "../models/users.model"
import { ApiError } from "../utils/ApiErrors"
import { ApiResponse } from "../utils/ApiResponse"
import asyncHandler from "../utils/asyncHandler"

const createTweet = asyncHandler(async (req, res) => {})

const getUserTweets = asyncHandler(async (req, res) => {})

const updateTweet = asyncHandler(async (req, res) => {})

const deleteTweet = asyncHandler(async (req, res) => {})

export { createTweet, getUserTweets, updateTweet, deleteTweet }
