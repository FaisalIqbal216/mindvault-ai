import {
    useRef,
    useState
} from "react";


import {
    uploadDocument
} from "../services/documentService";




// =====================================
// DOCUMENT UPLOAD COMPONENT
// =====================================


function DocumentUpload({

    onUpload,

    onSuccess,

    onError

}) {



    const fileInputRef =
        useRef(null);



    const [file,setFile] =
        useState(null);



    const [uploading,setUploading] =
        useState(false);



    const [dragging,setDragging] =
        useState(false);






    const maxSize =
        25 * 1024 * 1024;



    const allowedExtensions = [

        ".pdf",

        ".doc",

        ".docx",

        ".txt"

    ];








    // =====================================
    // VALIDATION
    // =====================================


    const validateFile = (selected)=>{


        if(!selected){

            return "Please select a document.";

        }



        const filename =
            selected.name.toLowerCase();



        const valid =
            allowedExtensions.some(
                ext =>
                filename.endsWith(ext)
            );



        if(!valid){

            return (
                "Only PDF, DOC, DOCX and TXT files are allowed."
            );

        }





        if(selected.size > maxSize){

            return (
                "File size cannot exceed 25MB."
            );

        }



        return null;


    };









    const selectFile=(selected)=>{


        const error =
            validateFile(selected);



        if(error){

            onError?.(
                error
            );

            return;

        }



        setFile(selected);


    };









    // =====================================
    // INPUT CHANGE
    // =====================================


    const handleInput=(e)=>{


        const selected =
            e.target.files[0];



        selectFile(
            selected
        );


        e.target.value="";


    };









    // =====================================
    // DRAG DROP
    // =====================================


    const handleDrop=(e)=>{


        e.preventDefault();


        setDragging(false);



        if(uploading){

            return;

        }



        const dropped =
            e.dataTransfer.files[0];



        selectFile(
            dropped
        );



    };









    // =====================================
    // UPLOAD
    // =====================================


    const handleUpload=async()=>{


        if(!file){


            onError?.(
                "Please select a document first."
            );


            return;

        }





        try{


            setUploading(true);



            const response =
                await uploadDocument(
                    file
                );




            setFile(null);



            onSuccess?.(

                response?.message ||
                "Document uploaded successfully."

            );




            if(onUpload){

                await onUpload();

            }




        }

        catch(error){


            console.log(
                "UPLOAD ERROR",
                error
            );



            onError?.(

                error.response?.data?.message ||
                "Upload failed."

            );

        }



        finally{


            setUploading(false);


        }


    };









    return (


        <div
            className="document-upload-card"
        >



            <div

                className={
                    `
                    document-upload-dropzone
                    ${
                        dragging
                        ?
                        "drag-active"
                        :
                        ""
                    }
                    `
                }


                onDragOver={(e)=>{

                    e.preventDefault();

                    setDragging(true);

                }}


                onDragLeave={()=>{

                    setDragging(false);

                }}


                onDrop={handleDrop}


                onClick={()=>{

                    if(!uploading){

                        fileInputRef.current.click();

                    }

                }}

            >





                <input

                    ref={fileInputRef}

                    type="file"

                    hidden

                    accept=".pdf,.doc,.docx,.txt"

                    onChange={handleInput}

                    disabled={uploading}

                />







                <div
                    className="upload-icon"
                >

                    {
                        uploading
                        ?
                        "⏳"
                        :
                        "↑"
                    }

                </div>







                <h3>

                    {
                        file
                        ?
                        file.name
                        :
                        "Upload Knowledge Document"
                    }


                </h3>





                <p>

                    Drag & drop file here
                    or click to browse

                </p>







                {
                    file &&

                    <div
                        className="selected-document"
                        onClick={(e)=>
                            e.stopPropagation()
                        }
                    >


                        <span>

                            {
                                (
                                    file.size /
                                    (1024*1024)
                                )
                                .toFixed(2)
                            }
                            MB

                        </span>




                        <button

                            type="button"

                            onClick={()=>setFile(null)}

                        >

                            Remove

                        </button>



                    </div>

                }





            </div>







            <button

                className="document-upload-button"

                disabled={
                    uploading ||
                    !file
                }


                onClick={handleUpload}

            >

                {
                    uploading
                    ?
                    "Uploading..."
                    :
                    "Upload Document"
                }


            </button>





            <small>

                Supported:
                PDF, DOC, DOCX, TXT
                |
                Max 25MB

            </small>




        </div>


    );


}



export default DocumentUpload;