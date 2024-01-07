import { ApiError } from "../utils/ApiErrors"
import { ApiResponse } from "../utils/ApiResponse"
import asyncHandler from "../utils/asyncHandler"

const healthCheck = asyncHandler(async (_, res) => {
  res.status(200).json(new ApiResponse(200, "All fine !! :)"))
})

export { healthCheck }
