const DocumentChunk =
    require("../models/DocumentChunk");

const {
    generateEmbedding
} = require("./embeddingService");

// =====================================
// VECTOR SEARCH SERVICE
// KNOWLEDGE BASE RAG RETRIEVAL
// =====================================

const DEFAULT_LIMIT = 5;

const DEFAULT_THRESHOLD = 0.30;

// =====================================
// COSINE SIMILARITY
// =====================================

const cosineSimilarity = (
    vectorA,
    vectorB
) => {
    if (
        !Array.isArray(vectorA) ||
        !Array.isArray(vectorB)
    ) {
        return 0;
    }

    if (
        vectorA.length === 0 ||
        vectorB.length === 0 ||
        vectorA.length !==
            vectorB.length
    ) {
        return 0;
    }

    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    for (
        let i = 0;
        i < vectorA.length;
        i++
    ) {
        const a =
            Number(vectorA[i]) || 0;

        const b =
            Number(vectorB[i]) || 0;

        dotProduct +=
            a * b;

        magnitudeA +=
            a * a;

        magnitudeB +=
            b * b;
    }

    if (
        magnitudeA === 0 ||
        magnitudeB === 0
    ) {
        return 0;
    }

    return (
        dotProduct /
        (
            Math.sqrt(
                magnitudeA
            ) *
            Math.sqrt(
                magnitudeB
            )
        )
    );
};

// =====================================
// ESCAPE REGEX
// =====================================

const escapeRegex = (
    value
) => {
    return value.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
    );
};

// =====================================
// KEYWORD SEARCH FALLBACK
// =====================================

const keywordSearch = async (
    query,
    limit = DEFAULT_LIMIT
) => {
    if (
        !query ||
        !query.trim()
    ) {
        return [];
    }

    const words =
        query
            .trim()
            .split(/\s+/)
            .filter(
                word =>
                    word.length >= 2
            )
            .slice(0, 12);

    if (!words.length) {
        return [];
    }

    const regex =
        words
            .map(
                word =>
                    escapeRegex(word)
            )
            .join("|");

    const chunks =
        await DocumentChunk.find({
            content: {
                $regex: regex,
                $options: "i"
            }
        })
            .populate(
                "documentId",
                "title originalName name"
            )
            .limit(
                Math.max(
                    limit * 2,
                    limit
                )
            )
            .lean();

    return chunks
        .map(chunk => {
            const lowerContent =
                (
                    chunk.content ||
                    ""
                ).toLowerCase();

            const matchedWords =
                words.filter(
                    word =>
                        lowerContent.includes(
                            word.toLowerCase()
                        )
                ).length;

            const score =
                words.length
                    ? matchedWords /
                      words.length
                    : 0;

            return {
                ...chunk,

                score,

                searchType:
                    "keyword"
            };
        })
        .sort(
            (a, b) =>
                b.score -
                a.score
        )
        .slice(0, limit);
};

// =====================================
// SEMANTIC VECTOR SEARCH
// =====================================

const searchRelevantChunks =
    async (
        query,
        options = {}
    ) => {
        try {
            if (
                !query ||
                !query.trim()
            ) {
                return [];
            }

            const limit =
                Number(
                    options.limit
                ) ||
                DEFAULT_LIMIT;

            const threshold =
                typeof options.threshold ===
                "number"
                    ? options.threshold
                    : DEFAULT_THRESHOLD;

            // =================================
            // QUERY EMBEDDING
            // =================================

            let queryEmbedding;

            try {
                queryEmbedding =
                    await generateEmbedding(
                        query
                    );
            } catch (
                embeddingError
            ) {
                console.log(
                    "QUERY EMBEDDING ERROR:",
                    embeddingError.message
                );

                return await keywordSearch(
                    query,
                    limit
                );
            }

            if (
                !Array.isArray(
                    queryEmbedding
                ) ||
                !queryEmbedding.length
            ) {
                return await keywordSearch(
                    query,
                    limit
                );
            }

            // =================================
            // LOAD EMBEDDED CHUNKS
            // =================================

            const chunks =
                await DocumentChunk.find({
                    embedding: {
                        $exists: true,

                        $type: "array",

                        $ne: []
                    }
                })
                    .populate(
                        "documentId",
                        "title originalName name"
                    )
                    .lean();

            if (!chunks.length) {
                return await keywordSearch(
                    query,
                    limit
                );
            }

            // =================================
            // SCORE CHUNKS
            // =================================

            const scoredChunks =
                chunks
                    .map(chunk => {
                        const score =
                            cosineSimilarity(
                                queryEmbedding,
                                chunk.embedding
                            );

                        return {
                            ...chunk,

                            score,

                            searchType:
                                "semantic"
                        };
                    })
                    .filter(
                        chunk =>
                            chunk.score >=
                            threshold
                    )
                    .sort(
                        (a, b) =>
                            b.score -
                            a.score
                    )
                    .slice(
                        0,
                        limit
                    );

            // =================================
            // FALLBACK
            // =================================

            if (
                scoredChunks.length ===
                0
            ) {
                return await keywordSearch(
                    query,
                    limit
                );
            }

            return scoredChunks;

        } catch (error) {
            console.log(
                "VECTOR SEARCH ERROR:",
                error.message
            );

            return [];
        }
    };

// =====================================
// BUILD RAG CONTEXT
// =====================================

const buildKnowledgeContext = (
    chunks
) => {
    if (
        !Array.isArray(chunks) ||
        chunks.length === 0
    ) {
        return "";
    }

    return chunks
        .map(
            (
                chunk,
                index
            ) => {
                const document =
                    chunk.documentId ||
                    {};

                const documentName =
                    chunk.documentName ||
                    document.originalName ||
                    document.name ||
                    "Unknown Document";

                const title =
                    chunk.documentTitle ||
                    document.title ||
                    documentName;

                const page =
                    chunk.metadata &&
                    chunk.metadata.pageNumber
                        ? `Page ${chunk.metadata.pageNumber}`
                        : "";

                return `
KNOWLEDGE SOURCE ${index + 1}

Document:
${title}

File:
${documentName}

${page}

Chunk:
${chunk.chunkIndex ?? "N/A"}

Similarity:
${
    typeof chunk.score ===
    "number"
        ? chunk.score.toFixed(4)
        : "N/A"
}

Content:
${chunk.content || ""}
`;
            }
        )
        .join(
            "\n-----------------------------\n"
        );
};

// =====================================
// EXPORTS
// =====================================

module.exports = {
    searchRelevantChunks,

    buildKnowledgeContext,

    cosineSimilarity,

    keywordSearch
};