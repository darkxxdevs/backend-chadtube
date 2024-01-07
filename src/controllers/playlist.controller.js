import { isValidObjectId } from "mongoose"
import { ApiError } from "../utils/ApiErrors"
import { ApiResponse } from "../utils/ApiResponse"
import asyncHandler from "../utils/asyncHandler"

const createPlaylist = asyncHandler(async (req, res) => {})

const getUserPlaylist = asyncHandler(async (req, res) => {})

const getPlaylistById = asyncHandler(async (req, res) => {})

const addVideoToPlaylist = asyncHandler(async(req, res) > {})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {})

const deletePlaylist = asyncHandler(async (req, res) => {})

const updatePlaylist = asyncHandler(async (req, res) => {})

export {
  deletePlaylist,
  createPlaylist,
  getUserPlaylist,
  updatePlaylist,
  removeVideoFromPlaylist,
  addVideoToPlaylist,
  getPlaylistById,
}
