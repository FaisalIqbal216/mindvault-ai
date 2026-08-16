import {
useState
} from "react";




function AdminDocuments(){



const [documents,setDocuments]=useState([]);





return(


<section

className="admin-documents"

aria-label="Document management"

>


<header>


<h2>
Knowledge Base Documents
</h2>


<p>
Manage documents used for future AI knowledge and RAG system.
</p>


</header>





<div className="document-upload-box">


<label

htmlFor="document-upload"

className="upload-label"

>


Upload New Document


</label>


<input

id="document-upload"

type="file"

accept=".pdf,.doc,.docx,.txt"


/>



<p>

Supported formats:

PDF, DOC, DOCX, TXT

</p>



</div>






<div className="table-wrapper">


<table>


<thead>


<tr>


<th>
File Name
</th>


<th>
Status
</th>


<th>
Uploaded Date
</th>


</tr>


</thead>





<tbody>


{

documents.length===0 ?


<tr>


<td colSpan="3">


No documents uploaded yet


</td>


</tr>


:


documents.map(doc=>(


<tr key={doc.id}>


<td>
{doc.name}
</td>


<td>
{doc.status}
</td>


<td>
{doc.date}
</td>


</tr>


))


}




</tbody>



</table>


</div>





</section>


);


}



export default AdminDocuments;