import mongoose, { isValidObjectId, mongo, trusted } from "mongoose"
import { ApiError } from "../utils/ApiErrors.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import { Playlist } from "../models/playlists.model.js"

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body

  const owner = req.user._id

  let details = { owner, videos: [] }

  if (name) {
    details.name = name
  }

  if (description) {
    details.description = description
  }

  if (!name && !description) {
    throw new ApiError(400, "Atleast one of name and description is required!")
  }

  const newPlayList = await Playlist.create(details)

  if (!newPlayList) {
    throw new ApiError(500, "Error while creating  playlist")
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, newPlayList, "New Playlist successfully created!")
    )
})

const getUserPlaylists = asyncHandler(async (req, res) => {
  const userId = req.user._id

  const userPlaylists = await Playlist.find({
    owner: userId,
  })

  if (userPlaylists.length === 0) {
    return res
      .send(204)
      .json(new ApiResponse(204, [], "No playlists creatd so far!"))
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, userPlaylists, "Playlists fetched successfully!")
    )
})

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params

  if (!mongoose.Types.ObjectId.isValid(playlistId)) {
    throw new ApiError(400, "Invalid objectId!")
  }

  const playlist = await Playlist.findById(playlistId)

  if (!playlist) {
    throw new ApiError(404, "Playlist not found!")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist fetched successfully!"))
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { videoId, playlistId } = req.params

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new ApiError(400, "Invaild videoId !")
  }

  if (!mongoose.Types.ObjectId.isValid(playlistId)) {
    throw new ApiError(400, "Invaild playlistId!")
  }

  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      $push: {
        videos: videoId,
      },
    },
    {
      new: true,
    }
  )

  if (!updatedPlaylist) {
    throw new ApiError(500, "Error while updating playlist!")
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedPlaylist, "Playlist updated successfuly!")
    )
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { videoId, playlistId } = req.params

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new ApiError(400, "Invaild videoId !")
  }

  if (!mongoose.Types.ObjectId.isValid(playlistId)) {
    throw new ApiError(400, "Invaild playlistId!")
  }

  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      $pull: {
        videos: videoId,
      },
    },
    { new: true }
  )

  if (!updatedPlaylist) {
    throw new ApiError(500, "Error while deleting the video from the playlist!")
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedPlaylist,
        "Video successfuly removed from the playlist!"
      )
    )
})

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params

  if (!mongoose.Types.ObjectId.isValid(playlistId)) {
    throw new ApiError(400, "Invaild playlistId!")
  }

  const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId)

  if (!deletedPlaylist) {
    throw new ApiError(500, "Error while deleting playlist!")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Playlist deleted successfuly!"))
})

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params
  const { name, description } = req.body

  if (!mongoose.Types.ObjectId.isValid(playlistId)) {
    throw new ApiError(400, "Invaild playlistId !")
  }

  let updateDetails = {}

  if (name) {
    updateDetails.name = name
  }

  if (description) {
    updateDetails.description = description
  }

  if (!name && !description) {
    throw new ApiError(
      400,
      "Atleast one of the name and description is required for updaing playlist!"
    )
  }

  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    updateDetails,
    { new: true }
  )

  if (!updatedPlaylist) {
    throw new ApiError(500, "Error while updating playlist details")
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedPlaylist, "Playlist updated successfully!")
    )
})

export {
  deletePlaylist,
  createPlaylist,
  getUserPlaylists,
  updatePlaylist,
  removeVideoFromPlaylist,
  addVideoToPlaylist,
  getPlaylistById,
}
