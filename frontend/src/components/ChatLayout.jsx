import { useState } from "react";

import ChatHeader from "./ChatHeader";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";

import { sendMessage } from "../services/api";


function ChatLayout(){


const [messages,setMessages] = useState([]);


const [loading,setLoading] = useState(false);



const [chatId,setChatId] = useState(null);





const handleSend = async(message)=>{


// User message show immediately

setMessages((prev)=>[

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



// Save conversation ID

if(response.chatId){

setChatId(response.chatId);

}




setMessages((prev)=>[

...prev,

{

sender:"ai",

text:response.answer

}

]);




}

catch(error){


console.log(
"Chat Error:",
error
);



setMessages((prev)=>[

...prev,

{

sender:"ai",

text:"Sorry, something went wrong."

}

]);


}




setLoading(false);



};






const newChat=()=>{


setMessages([]);


setChatId(null);


};






return(


<div className="ai-app">


<ChatHeader

onNewChat={newChat}

/>



<main className="ai-main">


<ChatWindow

messages={messages}

loading={loading}

/>


</main>




<ChatInput

onSend={handleSend}

loading={loading}

/>




</div>


);


}



export default ChatLayout;