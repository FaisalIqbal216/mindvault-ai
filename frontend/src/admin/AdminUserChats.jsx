import {
useEffect,
useState
} from "react";


import {
getUserChats
} from "../services/adminService";




function AdminUserChats({

userId,

userName,

onBack

}){


const [chats,setChats]=useState([]);

const [loading,setLoading]=useState(true);




useEffect(()=>{


if(!userId)
return;



const loadChats=async()=>{


try{


const data =
await getUserChats(userId);


setChats(data);


}


catch(error){


console.log(
"USER CHAT ERROR",
error
);


}


finally{


setLoading(false);


}



};


loadChats();



},[userId]);







return(


<section className="admin-user-chats">



<header className="admin-section-header">


<button

className="back-btn"

onClick={onBack}

>

← Back To Users

</button>



<h2>

{userName}'s Chats

</h2>


<p>

Chat history overview. Message content is hidden for privacy.

</p>



</header>







{

loading ?


<div className="admin-loading">

Loading chats...

</div>



:


chats.length===0 ?


<div className="empty-state">

No conversations found.

</div>




:


<div className="chat-grid">


{

chats.map(chat=>(


<article

className="chat-card"

key={chat._id}

>



<div className="chat-icon">

💬

</div>



<div>


<h3>

{chat.title}

</h3>



<p>

Created:

{" "}

{
new Date(chat.createdAt)
.toLocaleDateString()

}

</p>



<p>

Updated:

{" "}

{
new Date(chat.updatedAt)
.toLocaleDateString()

}

</p>


</div>



</article>



))


}



</div>



}




</section>



);


}



export default AdminUserChats;