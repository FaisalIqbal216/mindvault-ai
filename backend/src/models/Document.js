const mongoose =
    require("mongoose");


// =====================================
// DOCUMENT MODEL
// KNOWLEDGE BASE / RAG STORAGE
// =====================================

const documentSchema =
    new mongoose.Schema(

        {

            // =================================
            // DISPLAY INFORMATION
            // =================================

            title: {

                type: String,

                required: true,

                trim: true
            },


            name: {

                type: String,

                required: true,

                trim: true
            },


            originalName: {

                type: String,

                default: null,

                trim: true
            },


            // =================================
            // FILE INFORMATION
            // =================================

            fileType: {

                type: String,

                default: null,

                trim: true
            },


            mimeType: {

                type: String,

                default: null,

                trim: true
            },


            filePath: {

                type: String,

                default: null,

                trim: true
            },


            size: {

                type: Number,

                default: 0,

                min: 0
            },


            // =================================
            // FULL EXTRACTED CONTENT
            // =================================

            /*
             * Permanent source content.
             *
             * This is what the admin will read/edit
             * from the Document Reader.
             *
             * Chunks are derived from this content.
             */

            content: {

                type: String,

                default: ""
            },


            // =================================
            // PROCESSING
            // =================================

            status: {

                type: String,

                enum: [

                    "processing",

                    "completed",

                    "failed"

                ],

                default: "processing",

                index: true
            },


            processingError: {

                type: String,

                default: null
            },


            // =================================
            // DOCUMENT STATISTICS
            // =================================

            characterCount: {

                type: Number,

                default: 0,

                min: 0
            },


            wordCount: {

                type: Number,

                default: 0,

                min: 0
            },


            chunks: {

                type: Number,

                default: 0,

                min: 0
            },


            pageCount: {

                type: Number,

                default: null,

                min: 0
            },


            // =================================
            // UPLOADED BY
            // =================================

            uploadedBy: {

                type:
                    mongoose.Schema.Types.ObjectId,

                ref: "User",

                required: true,

                index: true
            },


            // =================================
            // EMBEDDING INFORMATION
            // =================================

            embeddingStatus: {

                type: String,

                enum: [

                    "pending",

                    "processing",

                    "completed",

                    "failed"

                ],

                default: "pending",

                index: true
            },


            embeddingModel: {

                type: String,

                default: null,

                trim: true
            },


            embeddingDimensions: {

                type: Number,

                default: 0,

                min: 0
            },


            embeddingError: {

                type: String,

                default: null
            },


            // =================================
            // FUTURE VECTOR DATABASE IDS
            // =================================

            vectorIds: {

                type: [String],

                default: []
            }

        },

        {

            timestamps: true
        }
    );


// =====================================
// INDEXES
// =====================================

documentSchema.index({

    uploadedBy: 1,

    createdAt: -1

});


documentSchema.index({

    status: 1,

    embeddingStatus: 1

});


documentSchema.index({

    originalName: 1

});


module.exports =
    mongoose.model(
        "Document",
        documentSchema
    );