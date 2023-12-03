import fs from "fs"
import bcrypt, { hash } from "bcrypt"
import { User } from "../models/users.model.js"
import { ApiError } from "../utils/ApiErrors.js"
import asyncHandler from "../utils/asyncHandler.js"

import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body

  if (
    [fullName, email, password, username].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required!")
  }

  const validMailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  if (!email.match(validMailFormat)) {
    throw new ApiError(400, "Invalid email address!")
  }

  if (password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters long!")
  }

  const exisitingUser = await User.findOne({
    $or: [{ email }, { username }],
  })

  if (exisitingUser) {
    throw new ApiError(400, "User already exists!")
  }

  const avatarLocalPath = req.files?.avatar[0].path

  let coverImageLocalPath

  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required!")
  }

  if (avatarLocalPath == coverImageLocalPath) {
    fs.unlinkSync(avatarLocalPath)
    throw new ApiError(400, "Avatar and Cover image cannot be the same!")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  const saltGenRounds = 10

  const salt = await bcrypt.genSalt(saltGenRounds)
  const hashedPassword = await bcrypt.hash(password, salt)

  const newUser = await User.create({
    fullName,
    email,
    username: username.toLowerCase(),
    password: hashedPassword,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  })

  const createdUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
  )

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user!")
  }

  return res.json(
    new ApiResponse(201, createdUser, "User created Successfully!")
  )
})

export { registerUser }
