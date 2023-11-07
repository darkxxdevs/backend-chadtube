/* this is a wrapper method around the various functions that need to be asnychronous
   with error handling
*/

const asyncHandler = (func) => async (req, res, next) => {
  try {
    await func(req, res, next)
  } catch (error) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    })
  }
}

// exporting the method

export default asyncHandler
