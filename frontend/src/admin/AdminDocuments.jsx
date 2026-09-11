import {
    useEffect,
    useState
} from "react";


import "../styles/document.css";


import DocumentUpload
    from "../components/DocumentUpload";


import DocumentCard
    from "../components/DocumentCard";


import {

    getAdminDocuments,

    getDocument,

    updateDocument,

    deleteDocument,

    getDocumentId,

    getDocumentName,

    getDocumentType,

    formatFileSize,

    formatDocumentDate

} from "../services/documentService";




// =====================================
// ADMIN DOCUMENTS
// KNOWLEDGE BASE MANAGEMENT
// =====================================


function AdminDocuments(){



const [

documents,

setDocuments

] = useState([]);




const [

loadingDocuments,

setLoadingDocuments

] = useState(true);





const [

selectedDocument,

setSelectedDocument

] = useState(null);





const [

deleteTarget,

setDeleteTarget

] = useState(null);





const [

deletingId,

setDeletingId

] = useState(null);





const [

toast,

setToast

] = useState(null);





const [

editDocument,

setEditDocument

] = useState(null);





const [

editTitle,

setEditTitle

] = useState("");





const [

editContent,

setEditContent

] = useState("");





const [

saving,

setSaving

] = useState(false);







// =====================================
// LOAD DOCUMENTS
// =====================================


const loadDocuments = async()=>{


try{


setLoadingDocuments(true);



const data =

await getAdminDocuments();



setDocuments(

Array.isArray(data)

?

data

:

[]

);



}


catch(error){


console.log(

"DOCUMENT LOAD ERROR:",

error

);



showToast(

error.response?.data?.message ||

"Unable to load documents",

"error"

);



}


finally{


setLoadingDocuments(false);


}



};








// =====================================
// INITIAL LOAD
// =====================================


useEffect(()=>{


loadDocuments();


},[]);






// =====================================
// TOAST
// =====================================


const showToast=(

message,

type="success"

)=>{


setToast({

message,

type

});


};





useEffect(()=>{


if(!toast)

return;



const timer =

setTimeout(()=>{


setToast(null);



},3500);




return()=>{


clearTimeout(timer);


};



},[toast]);







// =====================================
// UPLOAD SUCCESS
// =====================================


const handleUploadSuccess=async(message)=>{


showToast(

message ||

"Document uploaded successfully",

"success"

);



await loadDocuments();


};






const handleUploadError=(message)=>{


showToast(

message ||

"Upload failed",

"error"

);



};






// =====================================
// VIEW DOCUMENT
// =====================================


const handleView=async(document)=>{


try{


const data =

await getDocument(

getDocumentId(document)

);




setSelectedDocument(data);



}


catch(error){


console.log(error);



showToast(

"Unable to open document",

"error"

);



}



};






// =====================================
// CLOSE VIEW
// =====================================


const closeView=()=>{


setSelectedDocument(null);


};







// =====================================
// OPEN EDIT
// =====================================


const handleEdit=async(document)=>{


try{


const data =

await getDocument(

getDocumentId(document)

);




setEditDocument(data);



setEditTitle(

data.title || ""

);



setEditContent(

data.content || ""

);



}


catch(error){


showToast(

"Unable to load document for editing",

"error"

);



}



};






const closeEdit=()=>{


setEditDocument(null);


setEditTitle("");

setEditContent("");



};





// =====================================
// SAVE EDIT
// =====================================


const saveEdit=async()=>{


try{


setSaving(true);



await updateDocument(

editDocument._id,

{


title:editTitle,


content:editContent


}

);



showToast(

"Document updated successfully",

"success"

);



closeEdit();


await loadDocuments();



}


catch(error){


console.log(error);



showToast(

"Document update failed",

"error"

);



}

finally{


setSaving(false);


}



};


// =====================================
// DELETE CONFIRM OPEN
// =====================================


const openDeleteModal=(document)=>{


setDeleteTarget(document);



};







// =====================================
// DELETE DOCUMENT
// =====================================


const confirmDelete=async()=>{


if(!deleteTarget)

return;



const id =

getDocumentId(deleteTarget);




try{


setDeletingId(id);



await deleteDocument(id);




showToast(

"Document deleted successfully",

"success"

);



setDeleteTarget(null);



await loadDocuments();



}


catch(error){


console.log(

"DELETE DOCUMENT ERROR",

error

);



showToast(

error.response?.data?.message ||

"Delete failed",

"error"

);



}

finally{


setDeletingId(null);


}



};







// =====================================
// CANCEL DELETE
// =====================================


const cancelDelete=()=>{


setDeleteTarget(null);


};









return(


<section

className="admin-documents-page"

>





{/* =====================================
HEADER
===================================== */}



<header

className="document-page-header"

>


<div>


<h1>

Knowledge Base Documents

</h1>


<p>

Manage uploaded AI knowledge documents,

chunks and embeddings.

</p>


</div>



<div

className="document-count"

>

{

documents.length

}

Documents

</div>



</header>









{/* =====================================
TOAST
===================================== */}



{

toast &&


<div

className={

`document-toast ${toast.type}`

}

>


{toast.message}



</div>


}









{/* =====================================
UPLOAD
===================================== */}



<DocumentUpload


onUpload={handleUploadSuccess}


onSuccess={handleUploadSuccess}


onError={handleUploadError}


/>









{/* =====================================
DOCUMENT GRID
===================================== */}



<div

className="documents-grid"

>


{

loadingDocuments ?



<div

className="document-loading"

>

Loading documents...

</div>



:



documents.length===0 ?



<div

className="empty-document-box"

>


No documents uploaded yet.



</div>



:



documents.map((document)=>(



<DocumentCard


key={

getDocumentId(document)

}


document={document}



onView={handleView}



onEdit={handleEdit}



onDelete={openDeleteModal}



deleting={

deletingId ===

getDocumentId(document)

}


/>



))



}



</div>









{/* =====================================
VIEW DOCUMENT MODAL
===================================== */}



{

selectedDocument &&



<div

className="document-modal-overlay"

onClick={closeView}

>


<div

className="document-modal large"

onClick={

(e)=>e.stopPropagation()

}

>



<button

className="modal-close"

onClick={closeView}

>

×

</button>




<div

className="modal-header"

>


<h2>

Document Viewer

</h2>


</div>







<div

className="document-detail-header"

>


<div>


<h3>
{
 selectedDocument?.title ||
 selectedDocument?.name ||
 "Document Viewer"
}
</h3>



<p>

{

getDocumentName(

selectedDocument

)

}

</p>


</div>



<div

className="document-detail-status"

>


<span>

Status:

</span>


<strong>
{
    typeof selectedDocument?.status === "object"
    ?
    JSON.stringify(selectedDocument.status)
    :
    selectedDocument?.status || "processing"
}
</strong>


</div>



</div>









<div

className="document-information-grid"

>



<div>

<label>

Type

</label>

<strong>

{

getDocumentType(

selectedDocument

)

}

</strong>

</div>





<div>

<label>

Size

</label>

<strong>

{

formatFileSize(
    selectedDocument?.size || 0
)

}

</strong>

</div>





<div>

<label>

Chunks

</label>

<strong>
{
Array.isArray(selectedDocument?.chunks)
?
selectedDocument.chunks.length
:
selectedDocument?.chunks || 0
}
</strong>



</div>





<div>

<label>

Embedding

</label>

<strong>

{

selectedDocument.embeddingStatus ||

"pending"

}

</strong>

</div>




<div>

<label>

Uploaded

</label>

<strong>

{

formatDocumentDate(

selectedDocument

)

}

</strong>

</div>




</div>








<div

className="document-reader"

>


<h4>

Extracted Content

</h4>



<pre className="document-content-preview">
{
    typeof selectedDocument?.content === "object"
    ?
    JSON.stringify(
        selectedDocument.content,
        null,
        2
    )
    :
    selectedDocument?.content ||
    "No extracted content available"
}
</pre>



</div>







</div>

</div>



}









{/* =====================================
EDIT DOCUMENT MODAL
===================================== */}



{

editDocument &&



<div

className="document-modal-overlay"

onClick={closeEdit}

>


<div

className="document-modal large"

onClick={

(e)=>e.stopPropagation()

}

>



<button

className="modal-close"

onClick={closeEdit}

>

×

</button>




<div

className="modal-header"

>


<h2>

Edit Document

</h2>


<p>

After saving, document chunks and

embeddings will be regenerated.

</p>


</div>







<div

className="edit-form"

>



<label>

Document Title

</label>



<input

value={editTitle}


onChange={

(e)=>

setEditTitle(

e.target.value

)

}


/>









<label>

Document Content

</label>



<textarea

value={editContent}



onChange={

(e)=>

setEditContent(

e.target.value

)

}



/>








<button

className="save-document-button"


disabled={saving}


onClick={saveEdit}


>


{

saving

?

"Saving..."

:

"Save Changes"

}



</button>



</div>






</div>

</div>



}









{/* =====================================
DELETE CONFIRMATION MODAL
===================================== */}



{

deleteTarget &&



<div

className="document-modal-overlay"

>


<div

className="delete-confirm-modal"

>


<h3>

Delete Document?

</h3>



<p>

Are you sure you want to delete

<strong>

{" "}

{

getDocumentName(

deleteTarget

)

}

</strong>

?

All chunks and embeddings will also

be removed.

</p>







<div

className="delete-actions"

>


<button

className="cancel-delete"

onClick={cancelDelete}

>


Cancel


</button>






<button

className="confirm-delete"

onClick={confirmDelete}

>


Delete


</button>



</div>



</div>



</div>



}



</section>



);



}



export default AdminDocuments;