import { ApiError } from "../utils/ApiErrors.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"

const healthCheck = asyncHandler(async (_, res) => {
  res.status(200).json(new ApiResponse(200, "All fine !! :)"))
})

export { healthCheck }
