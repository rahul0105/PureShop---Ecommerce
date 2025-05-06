const notFound = (req, res, next) => {
  const error = new Error(`NOT FOUND - ${req.originalURL}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  //check for mongoose bad ObjecID //we saw in postman giving objectID 1 then html response 500 saying cast error
  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = "Resource not found";
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "Production" ? "" : err.stack,
  });
};

export { notFound, errorHandler };
