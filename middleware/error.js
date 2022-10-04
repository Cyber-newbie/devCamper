const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    let error = {
        ...err
    }
    error.message = err.message
    console.log(err.stack);

    //Mongoose bad object id
    if (err.name === 'CastError') {
        const message = `cannot find data with the id of ${err.value}`
        error = new ErrorResponse(message, 404)
    }

    //Mongoose duplicate value error
    if (err.code === 11000) {
        const message = `entered duplicate value`
        error = new ErrorResponse(message, 404)
    }

    //Mongoose Validation  error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 404)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error"
    })
}

module.exports = errorHandler;