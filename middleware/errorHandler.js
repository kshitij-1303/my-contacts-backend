const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statuscode = 400;
  switch (statuscode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation error",
        message: err.message,
        stacktrace: err.stack,
      })
    case constants.NOT_FOUND:
      res.json({
        title: "Not found",
        message: err.message,
        stacktrace: err.stack,
      })
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stacktrace: err.stack,
      })
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stacktrace: err.stack,
      })

    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stacktrace: err.stack,
      })




      break;

    default:
      console.log("No errors");
      break;
  }
}

module.exports = errorHandler;