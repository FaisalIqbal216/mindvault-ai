import {

X,

User,

Mail,

Calendar,

MessageCircle,

Edit3,

Save

} from "lucide-react";


import {

useState,

useEffect

} from "react";









function ProfileModal({

open,

onClose,

user,

chatCount,

onUpdate

}){



const [editing,setEditing]=useState(false);


const [name,setName]=useState("");






useEffect(()=>{


if(user){


setName(user.name || "");


}


},[user]);









if(!open)

return null;








const handleSave=()=>{


if(!name.trim())

return;



onUpdate({

name:name.trim()

});



setEditing(false);



};









const memberDate = user?.createdAt

?

new Date(user.createdAt)

.toLocaleDateString()

:

"Not Available";










return(



<div

className="modal-overlay"

onClick={onClose}

>


<div

className="profile-modal"

onClick={(e)=>e.stopPropagation()}

>








<button

className="modal-close"

onClick={onClose}

>

<X size={20}/>

</button>









<div className="profile-modal-avatar">


{

name

?

name.charAt(0).toUpperCase()

:

"U"

}


</div>











{

editing ?



<input

className="profile-edit-input"

value={name}

onChange={(e)=>setName(e.target.value)}

/>



:



<h2>

{user?.name || "User"}

</h2>



}









<p className="profile-email">


<Mail size={15}/>


{user?.email}



</p>









<div className="profile-info-box">







<div>


<User size={18}/>


<div>


<span>Name</span>


<strong>

{

editing

?

name

:

user?.name

}


</strong>


</div>



</div>









<div>


<Calendar size={18}/>


<div>


<span>Member Since</span>


<strong>

{memberDate}

</strong>


</div>



</div>









<div>


<MessageCircle size={18}/>


<div>


<span>Total Chats</span>


<strong>

{chatCount || 0}

</strong>


</div>



</div>








</div>









{

editing

?



<div className="profile-actions">



<button

className="save-profile"

onClick={handleSave}

>

<Save size={16}/>

Save

</button>






<button

className="cancel-profile"

onClick={()=>{

setName(user?.name || "");

setEditing(false);

}}

>


Cancel

</button>





</div>



:



<button

className="edit-profile"

onClick={()=>setEditing(true)}

>

<Edit3 size={16}/>

Edit Profile


</button>



}









</div>



</div>



);



}



export default ProfileModal;