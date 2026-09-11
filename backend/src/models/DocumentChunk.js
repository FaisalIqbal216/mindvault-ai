const mongoose = require("mongoose");

// =====================================
// DOCUMENT CHUNK MODEL
// RAG KNOWLEDGE BASE
// =====================================

const documentChunkSchema = new mongoose.Schema(
    {
        // =====================================
        // PARENT DOCUMENT
        // =====================================

        documentId: {
            type: mongoose.Schema.Types.ObjectId,

            ref: "Document",

            required: true,

            index: true
        },

        // =====================================
        // DOCUMENT IDENTIFICATION
        // =====================================

        /*
         * Stored directly so that when many
         * documents exist, MongoDB Compass clearly
         * shows which document this chunk belongs to.
         */
        documentName: {
            type: String,

            required: true,

            trim: true,

            index: true
        },

        originalName: {
            type: String,

            default: null,

            trim: true
        },

        documentTitle: {
            type: String,

            default: null,

            trim: true
        },

        // =====================================
        // CHUNK CONTENT
        // =====================================

        content: {
            type: String,

            required: true,

            trim: true
        },

        // =====================================
        // CHUNK ORDER
        // =====================================

        chunkIndex: {
            type: Number,

            required: true,

            min: 0
        },

        totalChunks: {
            type: Number,

            required: true,

            min: 1
        },

        // =====================================
        // SOURCE METADATA
        // =====================================

        metadata: {
            source: {
                type: String,

                default: "knowledge-base"
            },

            pageNumber: {
                type: Number,

                default: null
            },

            startPage: {
                type: Number,

                default: null
            },

            endPage: {
                type: Number,

                default: null
            },

            fileType: {
                type: String,

                default: null
            },

            mimeType: {
                type: String,

                default: null
            },

            title: {
                type: String,

                default: null
            }
        },

        // =====================================
        // EMBEDDING
        // =====================================

        embedding: {
            type: [Number],

            default: []
        },

        embeddingModel: {
            type: String,

            default: null
        },

        embeddingDimensions: {
            type: Number,

            default: 0,

            min: 0
        },

        embeddingStatus: {
            type: String,

            enum: [
                "pending",
                "completed",
                "failed"
            ],

            default: "pending",

            index: true
        },

        embeddingError: {
            type: String,

            default: null
        }
    },

    {
        timestamps: true
    }
);

// =====================================
// INDEXES
// =====================================

// Retrieve all chunks belonging to a document
documentChunkSchema.index({
    documentId: 1,
    chunkIndex: 1
});

// Identify chunks by document
documentChunkSchema.index({
    documentName: 1,
    chunkIndex: 1
});

// Find chunks with completed embeddings
documentChunkSchema.index({
    embeddingStatus: 1
});

// Prevent duplicate chunk numbers
// inside the same document.
documentChunkSchema.index(
    {
        documentId: 1,
        chunkIndex: 1
    },
    {
        unique: true
    }
);

module.exports = mongoose.model(
    "DocumentChunk",
    documentChunkSchema
);