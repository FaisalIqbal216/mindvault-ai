import {Trash2,X} from "lucide-react";


function DeleteModal({

open,

onClose,

onConfirm,

title

}){


if(!open)

return null;



return(


<div className="delete-overlay">


<div className="delete-modal">


<button

className="close-modal"

onClick={onClose}

>

<X size={18}/>

</button>



<Trash2

size={40}

className="delete-icon"

/>



<h3>

Delete conversation?

</h3>



<p>

Are you sure you want to delete

<br/>

<b>{title}</b>

?

</p>




<div className="delete-actions">


<button

className="cancel-delete"

onClick={onClose}

>

Cancel

</button>



<button

className="confirm-delete"

onClick={onConfirm}

>

Delete

</button>



</div>


</div>


</div>


);


}


export default DeleteModal;