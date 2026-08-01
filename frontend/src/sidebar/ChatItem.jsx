import {

useState,

useEffect,

useRef

} from "react";



import ChatMenu from "./ChatMenu";


import DeleteModal from "./DeleteModal";



import {

renameChat,

deleteChat,

pinChat,

archiveChat,

importantChat

} from "../services/chatService";







function ChatItem({

chat,

onSelect,

activeChat

}){





const [menu,setMenu]=useState(false);


const [deleteBox,setDeleteBox]=useState(false);


const [editing,setEditing]=useState(false);


const [title,setTitle]=useState(chat.title);




const menuRef = useRef(null);









// CLOSE MENU OUTSIDE CLICK

useEffect(()=>{



const handleOutsideClick=(event)=>{



if(

menuRef.current &&

!menuRef.current.contains(event.target)

){


setMenu(false);


}



};





document.addEventListener(

"mousedown",

handleOutsideClick

);





return()=>{


document.removeEventListener(

"mousedown",

handleOutsideClick

);



};



},[]);









const updateSidebar=()=>{


window.dispatchEvent(

new Event("chatUpdated")

);



};











const handleRename=async()=>{


if(!title.trim())

return;



await renameChat(

chat._id,

title

);




setEditing(false);


setMenu(false);


updateSidebar();



};









const handleDelete=async()=>{



await deleteChat(

chat._id

);




setDeleteBox(false);


setMenu(false);


updateSidebar();



};









const handlePin=async()=>{


await pinChat(

chat._id,

!chat.pinned

);



setMenu(false);


updateSidebar();



};










const handleArchive=async()=>{


await archiveChat(

chat._id

);



setMenu(false);


updateSidebar();



};









const handleImportant=async()=>{


await importantChat(

chat._id,

!chat.important

);



setMenu(false);


updateSidebar();



};












return(



<>



<div


className={

chat._id === activeChat

?

"chat-item active"

:

"chat-item"

}




onClick={()=>onSelect(chat)}



>










<div className="chat-info">





{

editing ?



<input


value={title}


autoFocus



onChange={(e)=>setTitle(e.target.value)}




onBlur={handleRename}




onKeyDown={(e)=>{


if(e.key==="Enter"){


handleRename();


}



}}




/>





:



<h4>


{chat.title}


</h4>



}








<span>



{

new Date(chat.updatedAt)

.toLocaleDateString()

}



</span>






</div>












<div


className="chat-actions"


ref={menuRef}


>






<button
className="chat-menu"

onClick={(e)=>{
e.stopPropagation();
setMenu(prev=>!prev);
}}

>
<span>⋮</span>
</button>









{

menu &&



<ChatMenu



chat={chat}




onRename={()=>{


setEditing(true);


setMenu(false);



}}



onDelete={()=>{


setDeleteBox(true);


setMenu(false);



}}




onPin={handlePin}




onArchive={handleArchive}




onImportant={handleImportant}




/>



}








</div>







</div>












<DeleteModal



open={deleteBox}



title={chat.title}



onClose={()=>setDeleteBox(false)}



onConfirm={handleDelete}




/>









</>



);



}





export default ChatItem;