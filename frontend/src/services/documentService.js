import API from "./api";


// =====================================
// DOCUMENT SERVICE
// ADMIN KNOWLEDGE BASE
// =====================================



// =====================================
// GET ALL DOCUMENTS
// =====================================


export const getAdminDocuments = async()=>{


    try{


        const response =
            await API.get(
                "/admin/documents"
            );



        const data =
            response.data;



        if(Array.isArray(data)){

            return data;

        }



        if(
            Array.isArray(
                data?.documents
            )
        ){

            return data.documents;

        }



        return [];


    }

    catch(error){


        console.log(
            "GET DOCUMENT ERROR",
            error
        );


        throw error;


    }


};








// =====================================
// UPLOAD DOCUMENT
// =====================================


export const uploadDocument = async(file)=>{


    if(!file){

        throw new Error(
            "No document selected."
        );

    }



    const formData =
        new FormData();



    formData.append(
        "document",
        file
    );





    try{


        const response =
            await API.post(

                "/admin/documents/upload",

                formData,

                {

                    headers:{

                        "Content-Type":
                        "multipart/form-data"

                    }

                }

            );



        return response.data;



    }

    catch(error){


        console.log(
            "UPLOAD DOCUMENT ERROR",
            error
        );


        throw error;


    }


};









// =====================================
// GET SINGLE DOCUMENT
// VIEW DOCUMENT
// =====================================


export const getDocument = async(id)=>{


    if(!id){

        throw new Error(
            "Document ID missing."
        );

    }




    try{


        const response =
            await API.get(

                `/admin/documents/${id}`

            );



        return response.data;



    }

    catch(error){


        console.log(
            "GET SINGLE DOCUMENT ERROR",
            error
        );


        throw error;


    }


};









// =====================================
// UPDATE DOCUMENT
// TITLE + CONTENT
// RECHUNK + EMBEDDING BACKEND
// =====================================


export const updateDocument = async(

    id,

    data

)=>{


    if(!id){

        throw new Error(
            "Document ID missing."
        );

    }





    try{


        const response =
            await API.put(

                `/admin/documents/${id}`,

                data

            );



        return response.data;



    }

    catch(error){


        console.log(
            "UPDATE DOCUMENT ERROR",
            error
        );


        throw error;


    }



};









// =====================================
// DELETE DOCUMENT
// =====================================


export const deleteDocument = async(id)=>{


    if(!id){

        throw new Error(
            "Document ID missing."
        );

    }





    try{


        const response =
            await API.delete(

                `/admin/documents/${id}`

            );



        return response.data;



    }

    catch(error){


        console.log(
            "DELETE DOCUMENT ERROR",
            error
        );


        throw error;


    }


};









// =====================================
// DOCUMENT ID HELPER
// =====================================


export const getDocumentId=(document)=>{


    return (

        document?._id ||

        document?.id ||

        null

    );


};









// =====================================
// DOCUMENT NAME HELPER
// =====================================


export const getDocumentName=(document)=>{


    return (

        document?.originalName ||

        document?.name ||

        document?.title ||

        "Unknown Document"

    );


};









// =====================================
// FILE TYPE HELPER
// =====================================


export const getDocumentType=(document)=>{


    const mime =

        document?.mimeType ||

        document?.fileType ||

        "";





    if(

        mime.includes(
            "pdf"
        )

    ){

        return "PDF";

    }






    if(

        mime.includes(
            "word"
        )

    ){

        return "DOC";

    }






    if(

        mime.includes(
            "text"
        )

    ){

        return "TXT";

    }







    const name =
        getDocumentName(
            document
        )
        .toLowerCase();





    if(
        name.endsWith(".pdf")
    ){

        return "PDF";

    }





    if(

        name.endsWith(".doc") ||

        name.endsWith(".docx")

    ){

        return "DOC";

    }





    if(
        name.endsWith(".txt")
    ){

        return "TXT";

    }



    return "FILE";


};









// =====================================
// FILE SIZE FORMAT
// =====================================


export const formatFileSize=(bytes)=>{


    if(
        !bytes ||
        bytes<=0
    ){

        return "—";

    }





    if(bytes < 1024){

        return `${bytes} B`;

    }






    if(
        bytes <
        1024*1024
    ){

        return (

            `${(
                bytes/1024
            ).toFixed(1)} KB`

        );

    }





    return (

        `${(
            bytes /
            (1024*1024)

        ).toFixed(2)} MB`

    );


};









// =====================================
// DATE FORMAT
// =====================================


export const formatDocumentDate=(document)=>{


    const value =

        document?.createdAt ||

        document?.updatedAt ||

        document?.uploadedAt;





    if(!value){

        return "—";

    }





    const date =
        new Date(
            value
        );




    if(
        Number.isNaN(
            date.getTime()
        )
    ){

        return "—";

    }





    return date.toLocaleDateString(

        undefined,

        {

            year:"numeric",

            month:"short",

            day:"numeric"

        }

    );


};