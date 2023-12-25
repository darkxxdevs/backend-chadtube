/* this is a wrapper method around the various functions that need to be asnychronous
   with error handling
*/

const asyncHandler = (requestHandler) => {
  return async (req, res, next) => {
    try {
      await requestHandler(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

// exporting the method

export default asyncHandler
