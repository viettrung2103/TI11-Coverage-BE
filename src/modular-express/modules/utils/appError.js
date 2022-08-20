class AppError extends Error {
  constructor(msg, statusCode) {
    super(msg);

    this.statusCode = statusCode;
    this.error = `${statusCode}`.startsWith('4')?'fail':'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor); // add stack property to this error and add this stack tree of error as a parameter to this AppError object
  }
}

module.exports = AppError;