const multer = require("multer");

// =====================================
// ADMIN DOCUMENT UPLOAD MIDDLEWARE
// =====================================

// Files remain in memory temporarily.
// documentProcessor.js extracts the content
// before the request finishes.
const storage = multer.memoryStorage();

// =====================================
// ALLOWED FILE TYPES
// =====================================

const allowedTypes = [
    "application/pdf",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    "application/msword",

    "text/plain"
];

// =====================================
// FILE FILTER
// =====================================

const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        return cb(null, true);
    }

    return cb(
        new Error(
            "Only PDF, DOC, DOCX and TXT files are allowed."
        ),
        false
    );
};

// =====================================
// MULTER CONFIGURATION
// =====================================

const uploadDocument = multer({
    storage,

    limits: {
        // Maximum 20 MB
        fileSize: 20 * 1024 * 1024,

        // Only one document per request
        files: 1
    },

    fileFilter
});

// =====================================
// MULTER ERROR HANDLER
// =====================================

const handleDocumentUploadError = (
    err,
    req,
    res,
    next
) => {
    if (!err) {
        return next();
    }

    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                message:
                    "File is too large. Maximum allowed size is 20 MB."
            });
        }

        if (err.code === "LIMIT_FILE_COUNT") {
            return res.status(400).json({
                message:
                    "Only one document can be uploaded at a time."
            });
        }

        return res.status(400).json({
            message: err.message
        });
    }

    return res.status(400).json({
        message:
            err.message ||
            "Unable to upload document."
    });
};

module.exports = uploadDocument;

// Additional exports available if routes need them
module.exports.uploadDocument = uploadDocument;
module.exports.handleDocumentUploadError =
    handleDocumentUploadError;
module.exports.allowedTypes = allowedTypes;