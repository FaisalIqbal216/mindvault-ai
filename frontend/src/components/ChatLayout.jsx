import {
useState
} from "react";


import ChatWindow from "./ChatWindow";

import ChatInput from "./ChatInput";

import ChatHeader from "./ChatHeader";


import Sidebar from "../sidebar/Sidebar";



import {

sendMessage,

editMessage,

retryMessage

} from "../services/api";



import {

getChatById

} from "../services/chatService";








function ChatLayout(){





const [messages,setMessages]=useState([]);


const [loading,setLoading]=useState(false);


const [chatId,setChatId]=useState(null);



// EDIT MODE

const [editData,setEditData]=useState(null);



// INPUT

const [inputValue,setInputValue]=useState("");



// SIDEBAR

const [sidebarOpen,setSidebarOpen]=useState(true);



// TITLE

const [activeChatTitle,setActiveChatTitle]=useState("");











// =================================
// SEND MESSAGE
// TEXT + FILE SUPPORT
// =================================


const handleSend = async(message,file)=>{


if(

!message.trim()

&&

!file

)

return;



setLoading(true);



try{





// =================================
// EDIT MESSAGE
// =================================


if(editData){



const response = await editMessage(

chatId,

editData.id,

message

);





setMessages(prev=>{


const updated=[...prev];



updated[editData.index]={

_id:editData.id,

sender:"user",

text:message

};





if(

updated[editData.index+1]

&&

updated[editData.index+1].sender==="ai"

){


updated.splice(

editData.index+1,

1

);


}







updated.splice(

editData.index+1,

0,

{

sender:"ai",

text:response.answer

}

);



return updated;



});




setEditData(null);

setInputValue("");

setLoading(false);

return;


}









// =================================
// NORMAL MESSAGE
// =================================



setMessages(prev=>[

...prev,

{

sender:"user",

text:

message || "Uploaded file",

file:file || null

}

]);











// =================================
// BACKEND REQUEST
// =================================



const response = await sendMessage(

message,

chatId,

file

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






setInputValue("");



}



catch(error){


console.log(

"SEND ERROR:",

error

);



setMessages(prev=>[

...prev,

{

sender:"ai",

text:"Something went wrong while processing your request."

}

]);


}



setLoading(false);



};



// =================================
// EDIT MESSAGE CLICK
// =================================


const handleEdit=(text,id,index)=>{


setEditData({

id,

index

});


setInputValue(text);


};











// =================================
// RETRY AI MESSAGE
// =================================


const handleRetry=async(id,index)=>{


try{


setLoading(true);



const response = await retryMessage(

chatId,

id

);






setMessages(prev=>{


const updated=[...prev];



updated[index]={

...updated[index],

text:response.answer

};



return updated;



});



}



catch(error){


console.log(

"RETRY ERROR:",

error

);


}



setLoading(false);



};











// =================================
// OPEN EXISTING CHAT
// =================================


const openChat=async(chat)=>{


try{


const data = await getChatById(

chat._id

);





setChatId(data._id);



setActiveChatTitle(

data.title || "New Conversation"

);









const formattedMessages = data.messages.map(msg=>(


{

_id:msg._id,


sender:

msg.role==="user"

?

"user"

:

"ai",



text:msg.content,



file:msg.attachment || null


}



));








setMessages(formattedMessages);



}



catch(error){


console.log(

"LOAD CHAT ERROR:",

error

);



}



};











// =================================
// NEW CHAT
// =================================


const newChat=()=>{


setMessages([]);


setChatId(null);


setActiveChatTitle("");



setEditData(null);



setInputValue("");



};


// =================================
// COMPONENT RETURN
// =================================


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


onEdit={handleEdit}


onRetry={handleRetry}



/>





</div>









<ChatInput


onSend={handleSend}


loading={loading}


value={inputValue}


setValue={setInputValue}



/>









</div>





</div>



);



}








export default ChatLayout;