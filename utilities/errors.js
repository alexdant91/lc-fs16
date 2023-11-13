const OUT_ERRORS_DEFAULT_OPTIONS = {
    status: 500, message: "Internal server error"
}

const outErrors = (error, res, options = { ...OUT_ERRORS_DEFAULT_OPTIONS }) => {
    options = { ...OUT_ERRORS_DEFAULT_OPTIONS, ...options }

    console.log(error)
    return res.status(options.status).json({ message: options.message })
}

module.exports = { 
    outErrors,
}