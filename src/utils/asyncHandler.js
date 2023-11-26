/* this is a wrapper method around the various functions that need to be asnychronous
   with error handling
*/

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
  }
}

// exporting the method

export default asyncHandler
