import {
useState,
useEffect,
useRef
} from "react";


import {

User,

Settings,

LogOut,

Plus,

PanelLeftOpen,

PanelLeftClose

} from "lucide-react";


import {
useAuth
} from "../context/AuthContext";


import ProfileModal from "./ProfileModal";

import SettingsModal from "./SettingsModal";


import {

getSettings,

updateSettings,

updateProfile

} from "../services/api";




import {
getChats
} from "../services/chatService";





function ChatHeader({

onNewChat,

onToggleSidebar,

sidebarOpen,

activeChat

}){





const {

user,

logout,

updateUser,

changeTheme

}=useAuth();







const [open,setOpen]=useState(false);


const [profileOpen,setProfileOpen]=useState(false);


const [settingsOpen,setSettingsOpen]=useState(false);



const dropdownRef = useRef(null);

const [chatCount,setChatCount]=useState(0);





const [settings,setSettings]=useState({

darkMode:true,

saveHistory:true,

autoTitle:true

});












// LOAD SETTINGS

useEffect(()=>{


const loadSettings=async()=>{


try{


const data = await getSettings();


setSettings(data);



if(data.darkMode){

changeTheme("dark");

}

else{

changeTheme("light");

}



}

catch(error){


console.log(

"Settings load error",

error

);


}


};



loadSettings();


},[]);





useEffect(()=>{

const loadChatCount=async()=>{

try{

const chats = await getChats();

setChatCount(chats.length);

}
catch(error){

console.log(
"Chat count error",
error
);

}

};


loadChatCount();


window.addEventListener(
"chatUpdated",
loadChatCount
);


return()=>{

window.removeEventListener(
"chatUpdated",
loadChatCount
);

};


},[]);







// CLOSE DROPDOWN OUTSIDE CLICK

useEffect(()=>{


const handleClick=(event)=>{


if(

dropdownRef.current &&

!dropdownRef.current.contains(event.target)

){


setOpen(false);


}


};



document.addEventListener(

"mousedown",

handleClick

);




return()=>{


document.removeEventListener(

"mousedown",

handleClick

);


};



},[]);












const getInitials=(name)=>{


if(!name)

return "U";



return name

.split(" ")

.map(item=>item[0])

.join("")

.substring(0,2)

.toUpperCase();



};











// SAVE SETTINGS

const handleSettingsSave=async()=>{


try{


const updatedSettings = await updateSettings(settings);



setSettings(updatedSettings);





if(updatedSettings.darkMode){


changeTheme("dark");


}

else{


changeTheme("light");


}






setSettingsOpen(false);



}

catch(error){


console.log(

"Settings update error",

error

);



}


};












// SAVE PROFILE

const handleProfileUpdate=async(data)=>{


try{


const updatedUser = await updateProfile(data);



updateUser(updatedUser);



setProfileOpen(false);



}

catch(error){


console.log(

"Profile update error",

error

);



}



};












return(


<>

<header className="ai-header">







<div className="header-left">







<button

className="sidebar-toggle"

onClick={onToggleSidebar}

>


{

sidebarOpen

?

<PanelLeftClose size={22}/>

:

<PanelLeftOpen size={22}/>

}



</button>









<div className="ai-brand">


<div className="ai-logo">

AI

</div>








<div className="ai-brand-text">


<h1>

Personal AI Assistant

</h1>



<span>

Online • Groq AI

</span>


</div>




</div>







</div>









<div className="header-center">


<h3>


{

activeChat

?

activeChat

:

"New Conversation"

}



</h3>


</div>









<div className="header-actions">






<button

className="ai-new-chat"

onClick={onNewChat}

>


<Plus size={17}/>


New Chat


</button>












<div

className="header-profile"

ref={dropdownRef}

onClick={()=>setOpen(!open)}

>







<div className="header-avatar">


{

getInitials(user?.name)

}



</div>








<div className="header-user-info">


<h4>

{user?.name || "User"}

</h4>



<p>

Account

</p>


</div>










{

open &&



<div

className="profile-dropdown"

onClick={(e)=>e.stopPropagation()}

>





<button

onClick={()=>{


setProfileOpen(true);


setOpen(false);


}}

>


<User size={16}/>


Profile


</button>








<button

onClick={()=>{


setSettingsOpen(true);


setOpen(false);


}}

>


<Settings size={16}/>


Settings


</button>








<hr/>








<button

className="dropdown-logout"

onClick={logout}

>


<LogOut size={16}/>


Logout


</button>







</div>



}







</div>






</div>







</header>









<ProfileModal

open={profileOpen}

onClose={()=>setProfileOpen(false)}

user={user}

chatCount={chatCount}

onUpdate={handleProfileUpdate}

/>









<SettingsModal


open={settingsOpen}


onClose={()=>setSettingsOpen(false)}


settings={settings}


setSettings={setSettings}


onSave={handleSettingsSave}


/>








</>


);



}



export default ChatHeader;