const asyncHandler = (requestHandler) => { //middleware
  return (req, res, next) => { //req,res,next are express parameters
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    //if any error occurs in the requestHandler it will be caught here and passed to next middleware
  }
}

export { asyncHandler }   //named export