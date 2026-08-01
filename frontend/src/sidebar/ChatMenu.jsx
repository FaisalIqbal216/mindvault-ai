import {

Edit3,

Trash2,

Pin,

Archive,

Star

} from "lucide-react";




function ChatMenu({

chat,

onRename,

onDelete,

onPin,

onArchive,

onImportant

}){


return(


<div className="chat-dropdown">


<button onClick={onRename}>

<Edit3 size={15}/>

Rename

</button>




<button onClick={onPin}>

<Pin size={15}/>

{

chat.pinned

?

"Unpin"

:

"Pin"

}


</button>





<button onClick={onImportant}>


<Star size={15}/>


Important


</button>





<button onClick={onArchive}>


<Archive size={15}/>


Archive


</button>






<button

className="delete-option"

onClick={onDelete}

>


<Trash2 size={15}/>


Delete


</button>



</div>


);


}


export default ChatMenu;