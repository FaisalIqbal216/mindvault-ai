import {
useState,
useRef,
useEffect
} from "react";





function ChatInput({

onSend,

loading,

value,

setValue

}){





const [showMenu,setShowMenu]=useState(false);


const [selectedFile,setSelectedFile]=useState(null);



const fileRef=useRef(null);


const menuRef=useRef(null);









// ===============================
// CLOSE MENU OUTSIDE CLICK
// ===============================


useEffect(()=>{


const closeMenu=(event)=>{


if(

menuRef.current &&

!menuRef.current.contains(event.target)

){


setShowMenu(false);


}


};




document.addEventListener(

"mousedown",

closeMenu

);




return()=>{


document.removeEventListener(

"mousedown",

closeMenu

);



};


},[]);











// ===============================
// SEND MESSAGE
// TEXT + FILE
// ===============================


const send=()=>{


if(

(

!value.trim()

&&

!selectedFile

)

||

loading

)

return;





onSend(

value,

selectedFile

);






// clear input

setValue("");




// clear selected file

setSelectedFile(null);



// allow same file selection again

if(fileRef.current){

fileRef.current.value="";

}



};












// ===============================
// IMAGE SELECT
// ===============================


const openImage=()=>{


fileRef.current.accept="image/*";


fileRef.current.click();



setShowMenu(false);



};












// ===============================
// DOCUMENT SELECT
// ===============================


const openDocument=()=>{


fileRef.current.accept=".pdf,.doc,.docx,.txt";


fileRef.current.click();



setShowMenu(false);



};












// ===============================
// FILE CHANGE
// ===============================


const handleFile=(e)=>{


const file=e.target.files[0];



if(!file)

return;





// 20 MB validation

if(file.size > 20 * 1024 * 1024){


alert(

"File size should be less than 20MB"

);


e.target.value="";


return;


}






setSelectedFile(file);



};












// ===============================
// REMOVE FILE
// ===============================


const removeFile=()=>{


setSelectedFile(null);



if(fileRef.current){

fileRef.current.value="";

}


};














return(



<div

className={

`ai-composer ${

selectedFile

?

"expanded"

:

""

}`

}

>









<div

className="ai-plus-wrapper"

ref={menuRef}

>



<button

className="ai-plus-btn"

onClick={()=>setShowMenu(!showMenu)}

title="Upload"

>

+

</button>











{

showMenu &&



<div className="ai-upload-menu">



<button

onClick={openImage}

>

<span>

🖼

</span>

Upload Image

</button>









<button

onClick={openDocument}

>

<span>

📄

</span>

Upload Document

</button>





</div>



}



</div>














<input


ref={fileRef}


type="file"


style={{

display:"none"

}}


onChange={handleFile}


/>












<div className="ai-input-area">







{

selectedFile &&



<div className="ai-file-preview">





<div className="ai-file-name">


📎 {selectedFile.name}


</div>






<button

onClick={removeFile}

title="Remove file"

>

✕

</button>





</div>



}









<input


value={value || ""}


placeholder="Message your AI assistant..."


onChange={(e)=>setValue(e.target.value)}


onKeyDown={(e)=>{


if(

e.key==="Enter"

&&

!e.shiftKey

){


e.preventDefault();


send();



}



}}



/>







</div>












<button

className="ai-send-btn"

onClick={send}

disabled={loading}

title="Send"

>

➤

</button>








</div>



);


}



export default ChatInput;