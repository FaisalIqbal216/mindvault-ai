import ChatList from "./ChatList";


import {
useAuth
} from "../context/AuthContext";


import {

LogOut,

Plus

} from "lucide-react";







function Sidebar({

onSelectChat,

onNewChat,

open,

activeChat

}){






const {

user,

logout

}=useAuth();









const getInitials=(name)=>{


if(!name)

return "U";



return name

.split(" ")

.map(word=>word[0])

.join("")

.substring(0,2)

.toUpperCase();


};









return(


<aside


className={

open

?

"sidebar"

:

"sidebar closed"

}



>









<div className="sidebar-header">







<div className="sidebar-title">


<h2>

AI Assistant

</h2>




<span>

Personal AI

</span>



</div>









<button



className="new-chat-btn"



onClick={onNewChat}



>



<Plus size={17}/>



New Chat





</button>








</div>












<ChatList



onSelectChat={onSelectChat}



activeChat={activeChat}





/>













<div className="profile-box">







<div className="profile-user">






<div className="profile-avatar">


{

getInitials(user?.name)

}



</div>









<div className="profile-details">



<h4>

{user?.name}

</h4>







<p>

{user?.email}

</p>






</div>









</div>













<button



className="logout-btn"



onClick={logout}



>





<LogOut size={17}/>





Logout






</button>









</div>












</aside>


);



}



export default Sidebar;