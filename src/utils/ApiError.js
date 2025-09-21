class ApiError extends Error {
    constructor(// parameters with default values
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {// call the parent class constructor
        super(message)
        this.statusCode = statusCode
        this.data = null //check in doummentation what is the work of this.data
        this.message = message
        this.success = false;
        this.errors = errors

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
} 

export {ApiError}