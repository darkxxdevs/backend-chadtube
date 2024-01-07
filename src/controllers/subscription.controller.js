import mongoose, { isValidObjectId } from "mongoose"
import { ApiError } from "../utils/ApiErrors"
import { ApiResponse } from "../utils/ApiResponse"
import { User } from "../models/users.model"
import { Subscriptions } from "../models/subscription.model"
import asyncHandler from "../utils/asyncHandler"

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
