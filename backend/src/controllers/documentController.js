const Document =
    require("../models/Document");

const DocumentChunk =
    require("../models/DocumentChunk");

const {
    processDocument,
    createChunks,
    countWords
} = require("../services/documentProcessor");

const {
    generateEmbedding,
    getEmbeddingInfo
} = require("../services/embeddingService");


// =====================================
// CONSTANTS
// =====================================

const MAX_DOCUMENT_CONTENT_LENGTH =
    10 * 1024 * 1024;


// =====================================
// PREPARE CHUNKS + EMBEDDINGS
// =====================================

const prepareDocumentChunks = async (
    document,
    chunks
) => {

    if (
        !Array.isArray(chunks) ||
        chunks.length === 0
    ) {
        throw new Error(
            "No usable document chunks were created."
        );
    }


    const embeddingInfo =
        getEmbeddingInfo();


    const preparedChunks = [];


    let successfulEmbeddings = 0;

    let failedEmbeddings = 0;


    // =================================
    // PROCESS EVERY CHUNK
    // =================================

    for (
        const chunk of chunks
    ) {

        let embedding = [];

        let embeddingStatus =
            "pending";

        let embeddingError = null;


        try {

            embedding =
                await generateEmbedding(
                    chunk.content
                );


            if (
                !Array.isArray(
                    embedding
                ) ||
                embedding.length === 0
            ) {
                throw new Error(
                    "Empty embedding returned."
                );
            }


            embeddingStatus =
                "completed";

            successfulEmbeddings++;


        } catch (error) {

            embeddingStatus =
                "failed";

            embeddingError =
                error.message;

            failedEmbeddings++;


            console.log(
                "CHUNK EMBEDDING ERROR:",
                error.message
            );
        }


        preparedChunks.push({

            documentId:
                document._id,


            // =================================
            // DOCUMENT IDENTIFICATION
            // =================================

            documentName:
                document.originalName ||
                document.name,


            originalName:
                document.originalName ||
                document.name,


            documentTitle:
                document.title,


            // =================================
            // CONTENT
            // =================================

            content:
                chunk.content,


            // =================================
            // CHUNK ORDER
            // =================================

            chunkIndex:
                chunk.chunkIndex,


            totalChunks:
                chunks.length,


            // =================================
            // METADATA
            // =================================

            metadata: {

                source:
                    document.originalName ||
                    document.name,

                pageNumber:
                    null,

                startPage:
                    null,

                endPage:
                    null,

                fileType:
                    document.fileType,

                mimeType:
                    document.mimeType,

                title:
                    document.title
            },


            // =================================
            // EMBEDDING
            // =================================

            embedding,

            embeddingModel:
                embedding.length
                    ? embeddingInfo.model
                    : null,

            embeddingDimensions:
                embedding.length,

            embeddingStatus,

            embeddingError
        });
    }


    return {

        preparedChunks,

        totalChunks:
            preparedChunks.length,

        successfulEmbeddings,

        failedEmbeddings,

        embeddingModel:
            embeddingInfo.model,

        embeddingDimensions:
            embeddingInfo.dimensions ||
            (
                preparedChunks.find(
                    chunk =>
                        chunk.embedding &&
                        chunk.embedding.length
                )?.embedding?.length || 0
            )
    };
};


// =====================================
// CREATE / REPLACE CHUNKS SAFELY
// =====================================

const replaceDocumentChunks = async (
    documentId,
    preparedChunks
) => {

    // =================================
    // Delete old chunks
    // =================================

    await DocumentChunk.deleteMany({
        documentId
    });


    // =================================
    // Insert new chunks
    // =================================

    if (
        preparedChunks.length
    ) {

        await DocumentChunk.insertMany(
            preparedChunks
        );
    }
};


// =====================================
// UPLOAD DOCUMENT
// =====================================

const uploadDocument = async (
    req,
    res
) => {

    let createdDocument = null;


    try {

        const file =
            req.file;


        // =================================
        // FILE VALIDATION
        // =================================

        if (!file) {

            return res.status(
                400
            ).json({

                message:
                    "No document uploaded."
            });
        }


        // =================================
        // PROCESS FILE
        // =================================

        const processedDocument =
            await processDocument(
                file
            );


        if (
            !processedDocument.text ||
            !processedDocument.text.trim()
        ) {

            return res.status(
                400
            ).json({

                message:
                    "No readable text could be extracted from the document."
            });
        }


        // =================================
        // CONTENT SIZE SAFETY
        // =================================

        if (
            processedDocument.text.length >
            MAX_DOCUMENT_CONTENT_LENGTH
        ) {

            return res.status(
                400
            ).json({

                message:
                    "Document content is too large to store."
            });
        }


        // =================================
        // CREATE DOCUMENT
        // =================================

        createdDocument =
            await Document.create({

                title:
                    file.originalname,

                name:
                    file.originalname,

                originalName:
                    file.originalname,

                fileType:
                    file.mimetype,

                mimeType:
                    file.mimetype,

                filePath:
                    null,

                size:
                    file.size,

                uploadedBy:
                    req.user.id,

                status:
                    "processing",

                processingError:
                    null,

                content:
                    processedDocument.text,

                characterCount:
                    processedDocument
                        .characterCount,

                wordCount:
                    processedDocument
                        .wordCount,

                chunks:
                    0,

                pageCount:
                    processedDocument
                        .pageCount,

                embeddingStatus:
                    "processing",

                embeddingModel:
                    null,

                embeddingDimensions:
                    0,

                embeddingError:
                    null
            });


        // =================================
        // PREPARE CHUNKS
        // =================================

        const result =
            await prepareDocumentChunks(

                createdDocument,

                processedDocument.chunks
            );


        // =================================
        // SAVE CHUNKS
        // =================================

        await replaceDocumentChunks(

            createdDocument._id,

            result.preparedChunks
        );


        // =================================
        // UPDATE DOCUMENT STATUS
        // =================================

        createdDocument.chunks =
            result.totalChunks;


        createdDocument.embeddingModel =
            result.embeddingModel;


        createdDocument.embeddingDimensions =
            result.embeddingDimensions;


        createdDocument.embeddingError =
            result.failedEmbeddings > 0
                ? `${result.failedEmbeddings} chunk(s) failed to generate embeddings.`
                : null;


        createdDocument.status =
            "completed";


        /*
         * If every chunk has an embedding,
         * the document is fully RAG ready.
         *
         * If some embeddings failed, the
         * document remains completed but
         * embeddingStatus is failed so the
         * admin can clearly see the issue.
         */

        if (
            result.totalChunks > 0 &&
            result.failedEmbeddings === 0
        ) {

            createdDocument.embeddingStatus =
                "completed";

        } else if (
            result.successfulEmbeddings > 0
        ) {

            createdDocument.embeddingStatus =
                "failed";

        } else {

            createdDocument.embeddingStatus =
                "failed";
        }


        await createdDocument.save();


        // =================================
        // RESPONSE
        // =================================

        return res.status(
            201
        ).json({

            message:
                "Document uploaded and processed successfully.",

            document:
                createdDocument,

            processing: {

                chunks:
                    result.totalChunks,

                embedded:
                    result.successfulEmbeddings,

                embeddingFailed:
                    result.failedEmbeddings,

                embeddingStatus:
                    createdDocument
                        .embeddingStatus
            }
        });


    } catch (error) {

        console.log(
            "DOCUMENT UPLOAD ERROR:",
            error
        );


        // =================================
        // CLEANUP
        // =================================

        if (
            createdDocument
        ) {

            try {

                await DocumentChunk.deleteMany({
                    documentId:
                        createdDocument._id
                });


                await Document.findByIdAndDelete(
                    createdDocument._id
                );

            } catch (
                cleanupError
            ) {

                console.log(
                    "DOCUMENT CLEANUP ERROR:",
                    cleanupError.message
                );
            }
        }


        return res.status(
            500
        ).json({

            message:
                error.message ||
                "Document upload failed."
        });
    }
};


// =====================================
// GET ALL DOCUMENTS
// =====================================

const getDocuments = async (
    req,
    res
) => {

    try {

        const documents =
            await Document.find()

                .populate(
                    "uploadedBy",
                    "name email"
                )

                .sort({
                    createdAt:
                        -1
                })

                .select(
                    "-content"
                )

                .lean();


        return res.status(
            200
        ).json(
            documents
        );


    } catch (error) {

        console.log(
            "GET DOCUMENT ERROR:",
            error.message
        );


        return res.status(
            500
        ).json({

            message:
                "Unable to load documents."
        });
    }
};


// =====================================
// GET SINGLE DOCUMENT
// FULL CONTENT
// =====================================

const getDocument = async (
    req,
    res
) => {

    try {

        const document =
            await Document.findById(
                req.params.id
            )

                .populate(
                    "uploadedBy",
                    "name email"
                )

                .lean();


        if (!document) {

            return res.status(
                404
            ).json({

                message:
                    "Document not found."
            });
        }


        // =================================
        // GET CHUNKS
        // =================================

        const chunks =
            await DocumentChunk.find({

                documentId:
                    document._id

            })

                .sort({
                    chunkIndex:
                        1
                })

                .select(
                    "documentName originalName documentTitle content chunkIndex totalChunks metadata embeddingStatus embeddingDimensions"
                )

                .lean();


        // =================================
        // IMPORTANT
        // Use Document.content as the
        // authoritative editable content.
        //
        // Do NOT reconstruct the document
        // by joining overlapping chunks.
        // =================================

        return res.status(
            200
        ).json({

            ...document,

            content:
                document.content || "",

            chunks
        });


    } catch (error) {

        console.log(
            "GET SINGLE DOCUMENT ERROR:",
            error.message
        );


        return res.status(
            500
        ).json({

            message:
                "Unable to load document."
        });
    }
};


// =====================================
// UPDATE DOCUMENT
// EDIT + RE-CHUNK + RE-EMBED
// =====================================

const updateDocument = async (
    req,
    res
) => {

    try {

        const {
            title,
            content
        } = req.body;


        // =================================
        // FIND DOCUMENT
        // =================================

        const document =
            await Document.findById(
                req.params.id
            );


        if (!document) {

            return res.status(
                404
            ).json({

                message:
                    "Document not found."
            });
        }


        // =================================
        // VALIDATE CONTENT
        // =================================

        if (
            typeof content !==
                "string" ||
            !content.trim()
        ) {

            return res.status(
                400
            ).json({

                message:
                    "Document content cannot be empty."
            });
        }


        const cleanedContent =
            content.trim();


        if (
            cleanedContent.length >
            MAX_DOCUMENT_CONTENT_LENGTH
        ) {

            return res.status(
                400
            ).json({

                message:
                    "Updated document content is too large."
            });
        }


        // =================================
        // CREATE NEW CHUNKS FIRST
        //
        // IMPORTANT:
        // Existing chunks remain untouched
        // until new processing succeeds.
        // =================================

        const newChunks =
            createChunks(
                cleanedContent
            );


        if (
            !newChunks.length
        ) {

            return res.status(
                400
            ).json({

                message:
                    "No usable chunks could be created from the updated content."
            });
        }


        // =================================
        // TEMP DOCUMENT OBJECT
        // =================================

        const documentForChunks = {

            _id:
                document._id,

            title:
                typeof title ===
                    "string" &&
                title.trim()
                    ? title.trim()
                    : document.title,

            name:
                document.name,

            originalName:
                document.originalName,

            fileType:
                document.fileType,

            mimeType:
                document.mimeType
        };


        // =================================
        // GENERATE NEW EMBEDDINGS
        // =================================

        const result =
            await prepareDocumentChunks(

                documentForChunks,

                newChunks
            );


        // =================================
        // ONLY NOW REPLACE OLD CHUNKS
        // =================================

        await replaceDocumentChunks(

            document._id,

            result.preparedChunks
        );


        // =================================
        // UPDATE DOCUMENT
        // =================================

        document.title =
            documentForChunks.title;


        document.content =
            cleanedContent;


        document.characterCount =
            cleanedContent.length;


        document.wordCount =
            countWords(
                cleanedContent
            );


        document.chunks =
            result.totalChunks;


        document.embeddingModel =
            result.embeddingModel;


        document.embeddingDimensions =
            result.embeddingDimensions;


        document.embeddingError =
            result.failedEmbeddings > 0
                ? `${result.failedEmbeddings} chunk(s) failed to generate embeddings.`
                : null;


        document.status =
            "completed";


        if (
            result.failedEmbeddings ===
            0
        ) {

            document.embeddingStatus =
                "completed";

        } else {

            document.embeddingStatus =
                "failed";
        }


        await document.save();


        // =================================
        // RESPONSE
        // =================================

        return res.status(
            200
        ).json({

            message:
                "Document updated, re-chunked and re-embedded successfully.",

            document,

            processing: {

                chunks:
                    result.totalChunks,

                embedded:
                    result.successfulEmbeddings,

                embeddingFailed:
                    result.failedEmbeddings,

                embeddingStatus:
                    document.embeddingStatus
            }
        });


    } catch (error) {

        console.log(
            "UPDATE DOCUMENT ERROR:",
            error
        );


        return res.status(
            500
        ).json({

            message:
                error.message ||
                "Unable to update document."
        });
    }
};


// =====================================
// DELETE DOCUMENT
// DOCUMENT + ALL CHUNKS
// =====================================

const deleteDocument = async (
    req,
    res
) => {

    try {

        const document =
            await Document.findById(
                req.params.id
            );


        if (!document) {

            return res.status(
                404
            ).json({

                message:
                    "Document not found."
            });
        }


        // =================================
        // DELETE CHUNKS
        // =================================

        await DocumentChunk.deleteMany({

            documentId:
                document._id
        });


        // =================================
        // DELETE DOCUMENT
        // =================================

        await Document.findByIdAndDelete(
            document._id
        );


        return res.status(
            200
        ).json({

            message:
                "Document and all associated chunks deleted successfully."
        });


    } catch (error) {

        console.log(
            "DELETE DOCUMENT ERROR:",
            error.message
        );


        return res.status(
            500
        ).json({

            message:
                "Delete failed."
        });
    }
};


// =====================================
// EXPORTS
// =====================================

module.exports = {

    uploadDocument,

    getDocuments,

    getDocument,

    updateDocument,

    deleteDocument
};