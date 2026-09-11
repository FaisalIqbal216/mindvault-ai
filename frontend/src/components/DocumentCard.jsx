import {
    getDocumentId,
    getDocumentName,
    getDocumentType,
    formatFileSize,
    formatDocumentDate
} from "../services/documentService";


// =====================================
// DOCUMENT CARD
// ADMIN KNOWLEDGE BASE
// =====================================


function DocumentCard({

    document,

    onView,

    onEdit,

    onDelete,

    deleting

}) {



    const id =
        getDocumentId(
            document
        );



    const name =
        getDocumentName(
            document
        );



    const type =
        getDocumentType(
            document
        );



    const status =
        document?.status ||
        "processing";



    const embeddingStatus =
        document?.embeddingStatus ||
        "pending";





    // =====================================
    // FILE ICON
    // =====================================


    const getFileIcon = () => {


        switch(type){


            case "PDF":

                return (
                    <span className="file-icon pdf">
                        PDF
                    </span>
                );


            case "DOC":

                return (
                    <span className="file-icon doc">
                        DOC
                    </span>
                );


            case "TXT":

                return (
                    <span className="file-icon txt">
                        TXT
                    </span>
                );


            default:

                return (
                    <span className="file-icon">
                        FILE
                    </span>
                );

        }

    };







    // =====================================
    // STATUS CLASS
    // =====================================


    const statusClass = () => {


        if(status==="completed"){

            return "status-success";

        }


        if(status==="failed"){

            return "status-error";

        }


        return "status-loading";

    };







    return (

        <article
            className="document-card"
        >



            {/* CARD HEADER */}

            <div
                className="document-card-header"
            >


                <div
                    className="document-icon-wrapper"
                >

                    {getFileIcon()}

                </div>




                <span
                    className={
                        `document-status ${statusClass()}`
                    }
                >

                    {status}

                </span>



            </div>







            {/* DOCUMENT INFO */}


            <div
                className="document-card-body"
            >



                <h3
                    className="document-title"
                    title={name}
                >

                    {name}

                </h3>






                <div
                    className="document-meta"
                >



                    <div>

                        <small>
                            Type
                        </small>

                        <strong>
                            {type}
                        </strong>

                    </div>




                    <div>

                        <small>
                            Size
                        </small>

                        <strong>
                            {
                                formatFileSize(
                                    document?.size
                                )
                            }
                        </strong>

                    </div>




                    <div>

                        <small>
                            Uploaded
                        </small>

                        <strong>
                            {
                                formatDocumentDate(
                                    document
                                )
                            }
                        </strong>


                    </div>



                </div>









                {/* RAG INFORMATION */}


                <div
                    className="document-rag-box"
                >



                    <div>

                        <span>
                            Chunks
                        </span>

                        <strong>
                            {
                                document?.chunks ??
                                0
                            }
                        </strong>

                    </div>





                    <div>

                        <span>
                            Embedding
                        </span>


                        <strong
                            className={
                                embeddingStatus === "completed"
                                ?
                                "embedding-success"
                                :
                                "embedding-pending"
                            }
                        >

                            {
                                embeddingStatus
                            }

                        </strong>


                    </div>



                </div>







            </div>









            {/* ACTION BUTTONS */}



            <div
                className="document-card-actions"
            >



                <button

                    type="button"

                    className="document-btn view-btn"

                    onClick={()=>
                        onView?.(
                            document
                        )
                    }

                >

                    View

                </button>







                <button

                    type="button"

                    className="document-btn edit-btn"

                    onClick={()=>
                        onEdit?.(
                            document
                        )
                    }

                >

                    Edit

                </button>







                <button

                    type="button"

                    className="document-btn delete-btn"

                    disabled={
                        deleting
                    }

                    onClick={()=>
                        onDelete?.(
                            id
                        )
                    }

                >


                    {
                        deleting
                        ?
                        "Deleting..."
                        :
                        "Delete"
                    }


                </button>





            </div>







        </article>


    );



}



export default DocumentCard;