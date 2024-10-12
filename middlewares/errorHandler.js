// middleware/errorHandler.js

exports.handleJsonParsingError = (err, req, res, next) => {
    // Check if the error is a SyntaxError and is a result of a bad JSON format
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ 
            status: 400,
            message: err.message, // This will include the specific parsing error message
            data: null,
        });
    }
    next(err); // Pass the error to the next middleware
};
