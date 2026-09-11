const pdfParse =
    require("pdf-parse");

const mammoth =
    require("mammoth");


// =====================================
// CONFIGURATION
// =====================================

const DEFAULT_CHUNK_SIZE =
    1200;

const DEFAULT_CHUNK_OVERLAP =
    200;


// =====================================
// CLEAN TEXT
// =====================================

const cleanText = (
    text
) => {

    if (
        !text
    ) {
        return "";
    }


    return text

        .replace(
            /\r\n/g,
            "\n"
        )

        .replace(
            /\r/g,
            "\n"
        )

        .replace(
            /[ \t]+/g,
            " "
        )

        .replace(
            /[ \t]+\n/g,
            "\n"
        )

        .replace(
            /\n[ \t]+/g,
            "\n"
        )

        .replace(
            /\n{3,}/g,
            "\n\n"
        )

        .trim();
};


// =====================================
// COUNT WORDS
// =====================================

const countWords = (
    text
) => {

    if (
        !text ||
        !text.trim()
    ) {
        return 0;
    }


    return text

        .trim()

        .split(
            /\s+/
        )

        .filter(
            Boolean
        )

        .length;
};


// =====================================
// EXTRACT TEXT
// =====================================

const extractText = async (
    file
) => {

    if (
        !file
    ) {

        throw new Error(
            "No document file was provided."
        );
    }


    // =================================
    // PDF
    // =================================

    if (
        file.mimetype ===
        "application/pdf"
    ) {

        const data =
            await pdfParse(
                file.buffer
            );


        return {

            text:
                cleanText(
                    data.text || ""
                ),

            pageCount:
                data.numpages ||
                null
        };
    }


    // =================================
    // DOCX
    // =================================

    if (
        file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {

        const result =
            await mammoth.extractRawText({

                buffer:
                    file.buffer
            });


        return {

            text:
                cleanText(
                    result.value || ""
                ),

            pageCount:
                null
        };
    }


    // =================================
    // TXT
    // =================================

    if (
        file.mimetype ===
        "text/plain"
    ) {

        return {

            text:
                cleanText(

                    file.buffer.toString(
                        "utf-8"
                    )
                ),

            pageCount:
                null
        };
    }


    // =================================
    // LEGACY DOC
    // =================================

    if (
        file.mimetype ===
        "application/msword"
    ) {

        throw new Error(
            "Legacy DOC files cannot currently be extracted reliably. Please convert the document to DOCX or PDF."
        );
    }


    throw new Error(
        "Unsupported document format."
    );
};


// =====================================
// SPLIT LARGE TEXT
// =====================================

const splitLargeText = (

    text,

    size,

    overlap

) => {

    const pieces = [];


    let start = 0;


    while (
        start <
        text.length
    ) {

        const end =
            Math.min(

                start + size,

                text.length
            );


        const piece =
            text
                .slice(
                    start,
                    end
                )
                .trim();


        if (
            piece
        ) {

            pieces.push(
                piece
            );
        }


        if (
            end >=
            text.length
        ) {

            break;
        }


        start =
            Math.max(

                0,

                end - overlap
            );
    }


    return pieces;
};


// =====================================
// CREATE RAG CHUNKS
// =====================================

const createChunks = (

    text,

    size =
        DEFAULT_CHUNK_SIZE,

    overlap =
        DEFAULT_CHUNK_OVERLAP

) => {

    const cleaned =
        cleanText(
            text
        );


    if (
        !cleaned
    ) {

        return [];
    }


    if (
        size <= 0 ||
        overlap < 0 ||
        overlap >= size
    ) {

        throw new Error(
            "Invalid chunk size or overlap configuration."
        );
    }


    const paragraphs =
        cleaned

            .split(
                /\n{2,}/
            )

            .map(
                paragraph =>
                    paragraph.trim()
            )

            .filter(
                Boolean
            );


    const rawChunks = [];


    let current = "";


    // =================================
    // BUILD CHUNKS
    // =================================

    for (
        const paragraph
        of paragraphs
    ) {

        // =================================
        // LARGE PARAGRAPH
        // =================================

        if (
            paragraph.length >
            size
        ) {

            if (
                current
            ) {

                rawChunks.push(
                    current.trim()
                );

                current = "";
            }


            const pieces =
                splitLargeText(

                    paragraph,

                    size,

                    overlap
                );


            rawChunks.push(
                ...pieces
            );


            continue;
        }


        // =================================
        // ADD PARAGRAPH
        // =================================

        const candidate =
            current

                ? `${current}\n\n${paragraph}`

                : paragraph;


        if (
            candidate.length <=
            size
        ) {

            current =
                candidate;

            continue;
        }


        // =================================
        // SAVE CURRENT
        // =================================

        if (
            current
        ) {

            rawChunks.push(
                current.trim()
            );
        }


        // =================================
        // OVERLAP
        // =================================

        const previousTail =
            current.length >
            overlap

                ? current.slice(
                    -overlap
                )

                : current;


        current =
            previousTail

                ? `${previousTail}\n\n${paragraph}`

                : paragraph;


        // =================================
        // SAFETY SPLIT
        // =================================

        if (
            current.length >
            size * 1.5
        ) {

            const pieces =
                splitLargeText(

                    current,

                    size,

                    overlap
                );


            rawChunks.push(
                ...pieces
            );


            current = "";
        }
    }


    // =================================
    // FINAL CHUNK
    // =================================

    if (
        current.trim()
    ) {

        rawChunks.push(
            current.trim()
        );
    }


    // =================================
    // CLEAN FINAL CHUNKS
    // =================================

    const finalChunks =
        rawChunks

            .map(
                chunk =>
                    chunk.trim()
            )

            .filter(
                Boolean
            );


    const totalChunks =
        finalChunks.length;


    // =================================
    // ADD METADATA
    // =================================

    return finalChunks.map(

        (
            content,

            index
        ) => ({

            content,

            chunkIndex:
                index,

            totalChunks
        })
    );
};


// =====================================
// COMPLETE DOCUMENT PROCESS
// =====================================

const processDocument =
    async (
        file
    ) => {

        const extracted =
            await extractText(
                file
            );


        if (
            !extracted.text ||
            !extracted.text.trim()
        ) {

            throw new Error(
                "No readable text could be extracted from this document."
            );
        }


        const chunks =
            createChunks(
                extracted.text
            );


        if (
            !chunks.length
        ) {

            throw new Error(
                "Document was processed but no usable chunks were created."
            );
        }


        return {

            fileInfo: {

                name:
                    file.originalname,

                originalName:
                    file.originalname,

                mimeType:
                    file.mimetype,

                size:
                    file.size
            },


            text:
                extracted.text,


            pageCount:
                extracted.pageCount,


            characterCount:
                extracted.text.length,


            wordCount:
                countWords(
                    extracted.text
                ),


            chunks
        };
    };


// =====================================
// EXPORTS
// =====================================

module.exports = {

    processDocument,

    extractText,

    createChunks,

    cleanText,

    countWords,

    DEFAULT_CHUNK_SIZE,

    DEFAULT_CHUNK_OVERLAP
};