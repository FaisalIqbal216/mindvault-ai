import {
useState
} from "react";


import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";

import Sidebar from "../sidebar/Sidebar";


import {
sendMessage
} from "../services/api";


import {
getChatById
} from "../services/chatService";







function ChatLayout(){



const [messages,setMessages]=useState([]);

const [loading,setLoading]=useState(false);

const [chatId,setChatId]=useState(null);



// sidebar state

const [sidebarOpen,setSidebarOpen]=useState(true);



// current chat title

const [activeChatTitle,setActiveChatTitle]=useState("");









// ===============================
// SEND MESSAGE
// ===============================


const handleSend = async(message)=>{


setMessages(prev=>[

...prev,

{
sender:"user",
text:message
}

]);



setLoading(true);



try{


const response = await sendMessage(

message,

chatId

);





if(response.chatId){


setChatId(response.chatId);



window.dispatchEvent(

new Event("chatUpdated")

);


}






setMessages(prev=>[

...prev,

{
sender:"ai",
text:response.answer
}

]);



}



catch(error){


console.log(error);



setMessages(prev=>[

...prev,

{
sender:"ai",
text:"Something went wrong."
}

]);


}



setLoading(false);



};









// ===============================
// OPEN OLD CHAT
// ===============================


const openChat = async(chat)=>{


try{


const data = await getChatById(

chat._id

);



setChatId(data._id);



setActiveChatTitle(data.title);






const formattedMessages = data.messages.map(msg=>(


{

sender:

msg.role==="user"

?

"user"

:

"ai",


text:msg.content

}


));





setMessages(formattedMessages);



}


catch(error){


console.log(

"Load chat error",

error

);



}


};









// ===============================
// NEW CHAT
// ===============================


const newChat=()=>{


setMessages([]);


setChatId(null);


setActiveChatTitle("");



};











return(


<div className="dashboard">






<Sidebar


open={sidebarOpen}


activeChat={chatId}


onSelectChat={openChat}


onNewChat={newChat}


/>








<div className="dashboard-main">






<ChatHeader


onNewChat={newChat}


onToggleSidebar={()=>setSidebarOpen(!sidebarOpen)}


sidebarOpen={sidebarOpen}


activeChat={activeChatTitle}


/>









<div className="chat-content">



<ChatWindow


messages={messages}


loading={loading}


/>



</div>









<ChatInput


onSend={handleSend}


loading={loading}


/>







</div>






</div>


);



}



export default ChatLayout;