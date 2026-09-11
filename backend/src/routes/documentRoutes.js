const express = require("express");

const router =
    express.Router();


const authMiddleware =
    require("../middleware/authMiddleware");


const roleMiddleware =
    require("../middleware/roleMiddleware");


const uploadDocument =
    require("../middleware/uploadMiddleware");


const {

    uploadDocument:
        uploadDocumentController,

    getDocuments,

    getDocument,

    updateDocument,

    deleteDocument

} = require(
    "../controllers/documentController"
);


// =====================================
// ADMIN DOCUMENT UPLOAD
// =====================================

router.post(

    "/upload",

    authMiddleware,

    roleMiddleware("admin"),

    uploadDocument.single(
        "document"
    ),

    uploadDocumentController
);


// =====================================
// GET ALL DOCUMENTS
// =====================================

router.get(

    "/",

    authMiddleware,

    roleMiddleware("admin"),

    getDocuments
);


// =====================================
// GET SINGLE DOCUMENT
// =====================================

router.get(

    "/:id",

    authMiddleware,

    roleMiddleware("admin"),

    getDocument
);


// =====================================
// UPDATE DOCUMENT
//
// title + content
//
// Automatically:
// content update
// re-chunk
// re-embed
// old chunks replace
// =====================================

router.put(

    "/:id",

    authMiddleware,

    roleMiddleware("admin"),

    updateDocument
);


// =====================================
// DELETE DOCUMENT
//
// Deletes:
// Document
// All associated chunks
// =====================================

router.delete(

    "/:id",

    authMiddleware,

    roleMiddleware("admin"),

    deleteDocument
);


// =====================================
// DOCUMENT ERROR HANDLER
// =====================================

router.use(

    (
        err,
        req,
        res,
        next
    ) => {

        console.log(
            "DOCUMENT ROUTE ERROR:",
            err.message
        );


        return res.status(
            400
        ).json({

            message:
                err.message ||
                "Document request failed."
        });
    }
);


module.exports = router;