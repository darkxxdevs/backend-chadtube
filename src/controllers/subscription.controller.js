import mongoose from "mongoose"
import { ApiError } from "../utils/ApiErrors.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/users.model.js"
import { Subscriptions } from "../models/subscription.model.js"
import asyncHandler from "../utils/asyncHandler.js"

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params

  if (!mongoose.Types.ObjectId.isValid(channelId)) {
    throw new ApiError(400, "Invaild channel id!")
  }

  const userId = req.user?._id

  const existingSubscription = await Subscriptions.findOne({
    $and: [{ subscriber: userId }, { channel: channelId }],
  })

  if (!existingSubscription) {
    const newSubscription = await Subscriptions.create({
      channel: channelId,
      subscriber: userId,
    })

    if (!newSubscription) {
      throw new ApiError(500, "Error while creating subscription!")
    }

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          newSubscription,
          "Subscription added successfully!"
        )
      )
  }

  const deletedSubscription = await Subscriptions.deleteOne({
    $and: [{ channel: channelId }, { subscriber: userId }],
  })

  if (!deletedSubscription) {
    throw new ApiError(500, "Error while deleting the subscription!")
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        deletedSubscription,
        "Subscription removed sucessfully!"
      )
    )
})

const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params

  if (!mongoose.Types.ObjectId.isValid(channelId)) {
    throw new ApiError(400, "Invaild objectid !")
  }

  const subscriberList = await Subscriptions.find({
    channel: channelId,
  })

  if (subscriberList.length === 0) {
    return res.status(204).json(204, [], "No Subscribers yet!")
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, subscriberList, "Subscriber list fetch successful!")
    )
})

const getUserSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params

  if (!mongoose.Types.ObjectId.isValid(channelId)) {
    throw new ApiError(400, "Invaild objectid !")
  }

  const subscribedChannelList = await Subscriptions.find({
    subscriber: subscriberId,
  })

  if (subscribedChannelList === 0) {
    return res.status(204).json(204, [], "No subscriptions yet!")
  }

  return res
    .status(200)
    .json(200, subscribedChannelList, "Subscription fetch successful!")
})

export {
  toggleSubscription,
  getUserChannelSubscribers,
  getUserSubscribedChannels,
}
