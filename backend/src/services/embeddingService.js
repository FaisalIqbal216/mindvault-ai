// =====================================
// EMBEDDING SERVICE
// TEXT -> VECTOR
// =====================================
//
// Provider:
// Hugging Face
//
// Default model:
// sentence-transformers/all-MiniLM-L6-v2
//
// Default dimensions:
// 384
// =====================================


const DEFAULT_MODEL =
    process.env.HF_EMBEDDING_MODEL ||
    "sentence-transformers/all-MiniLM-L6-v2";


const DEFAULT_DIMENSIONS =
    384;


// =====================================
// GET API KEY
// =====================================

const getApiKey = () => {

    return process.env.HF_API_KEY;
};


// =====================================
// NORMALIZE EMBEDDING RESPONSE
// =====================================

const normalizeEmbedding = (
    result
) => {

    // =================================
    // DIRECT VECTOR
    // =================================

    if (

        Array.isArray(result) &&

        result.length > 0 &&

        typeof result[0] ===
            "number"

    ) {

        return result.map(
            Number
        );
    }


    // =================================
    // WRAPPED VECTOR
    // =================================

    if (

        result &&

        Array.isArray(
            result.embedding
        )

    ) {

        return result.embedding.map(
            Number
        );
    }


    // =================================
    // TOKEN-LEVEL EMBEDDINGS
    // =================================

    if (

        Array.isArray(result) &&

        Array.isArray(result[0])

    ) {

        const rows =
            result.filter(
                row =>
                    Array.isArray(row)
            );


        if (
            !rows.length
        ) {

            throw new Error(
                "Embedding response contained no valid vectors."
            );
        }


        const dimensions =
            rows[0].length;


        if (
            !dimensions
        ) {

            throw new Error(
                "Embedding vector has no dimensions."
            );
        }


        const vector =
            new Array(
                dimensions
            ).fill(0);


        let validRows = 0;


        for (
            const row
            of rows
        ) {

            if (
                row.length !==
                dimensions
            ) {

                continue;
            }


            for (
                let i = 0;

                i < dimensions;

                i++
            ) {

                vector[i] +=
                    Number(
                        row[i]
                    ) || 0;
            }


            validRows++;
        }


        if (
            validRows > 0
        ) {

            return vector.map(

                value =>
                    value /
                    validRows
            );
        }
    }


    // =================================
    // INVALID RESPONSE
    // =================================

    throw new Error(
        "Embedding API returned an invalid vector."
    );
};


// =====================================
// GENERATE ONE EMBEDDING
// =====================================

const generateEmbedding =
    async (

        text,

        model =
            DEFAULT_MODEL

    ) => {

        if (

            typeof text !==
                "string" ||

            !text.trim()

        ) {

            throw new Error(
                "Cannot generate embedding for empty text."
            );
        }


        const apiKey =
            getApiKey();


        if (
            !apiKey
        ) {

            throw new Error(
                "HF_API_KEY is missing from environment variables."
            );
        }


        const endpoint =
            `https://router.huggingface.co/hf-inference/models/${model}`;


        const response =
            await fetch(

                endpoint,

                {

                    method:
                        "POST",


                    headers: {

                        Authorization:
                            `Bearer ${apiKey}`,

                        "Content-Type":
                            "application/json"
                    },


                    body:
                        JSON.stringify({

                            inputs:
                                text.trim(),

                            options: {

                                wait_for_model:
                                    true
                            }
                        })
                }
            );


        if (
            !response.ok
        ) {

            const errorText =
                await response.text();


            throw new Error(

                `Embedding API error ${response.status}: ${errorText}`
            );
        }


        const result =
            await response.json();


        const embedding =
            normalizeEmbedding(
                result
            );


        if (

            !Array.isArray(
                embedding
            ) ||

            embedding.length === 0

        ) {

            throw new Error(
                "Embedding vector is empty."
            );
        }


        return embedding;
    };


// =====================================
// GENERATE MULTIPLE EMBEDDINGS
// =====================================

const generateEmbeddings =
    async (

        texts,

        model =
            DEFAULT_MODEL

    ) => {

        if (
            !Array.isArray(texts)
        ) {

            throw new Error(
                "texts must be an array."
            );
        }


        const embeddings = [];


        for (
            const text
            of texts
        ) {

            const embedding =
                await generateEmbedding(

                    text,

                    model
                );


            embeddings.push(
                embedding
            );
        }


        return embeddings;
    };


// =====================================
// GENERATE EMBEDDINGS WITH PROGRESS
// =====================================

const generateEmbeddingsWithProgress =
    async (

        texts,

        onProgress = null,

        model =
            DEFAULT_MODEL

    ) => {

        if (
            !Array.isArray(texts)
        ) {

            throw new Error(
                "texts must be an array."
            );
        }


        const embeddings = [];


        for (
            let i = 0;

            i < texts.length;

            i++
        ) {

            const embedding =
                await generateEmbedding(

                    texts[i],

                    model
                );


            embeddings.push(
                embedding
            );


            if (
                typeof onProgress ===
                "function"
            ) {

                await onProgress({

                    completed:
                        i + 1,

                    total:
                        texts.length
                });
            }
        }


        return embeddings;
    };


// =====================================
// EMBEDDING INFORMATION
// =====================================

const getEmbeddingInfo =
    () => {

        return {

            model:
                DEFAULT_MODEL,

            provider:
                "Hugging Face",

            dimensions:
                DEFAULT_DIMENSIONS
        };
    };


// =====================================
// EXPORTS
// =====================================

module.exports = {

    generateEmbedding,

    generateEmbeddings,

    generateEmbeddingsWithProgress,

    getEmbeddingInfo
};