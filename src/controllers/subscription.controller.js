import mongoose, { isValidObjectId } from "mongoose"
import { ApiError } from "../utils/ApiErrors.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/users.model.js"
import { Subscriptions } from "../models/subscription.model.js"
import asyncHandler from "../utils/asyncHandler.js"

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params.channelId
})

const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params.channelId
})

const getUserSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params.subscriberId
})

export {
  toggleSubscription,
  getUserChannelSubscribers,
  getUserSubscribedChannels,
}
