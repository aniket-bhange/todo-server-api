function ErrorResponse(data, code=500, message="Server Error"){
    return {
        error: data,
        code,
        message
    }
}

function SuccessResponse(data, code=200, message="Success"){
    return {
        data,
        code,
        message
    }
}

module.exports = {
    ErrorResponse,
    SuccessResponse
}