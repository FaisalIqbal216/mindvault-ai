import MessageBubble from "./MessageBubble";

import TypingIndicator from "./TypingIndicator";





function ChatWindow({

messages,

loading,

onEdit,

onRetry

}){



return(


<div className="ai-chat-window">







{

messages.length===0 &&

(


<div className="ai-empty-state">


<div className="ai-empty-icon">

🤖

</div>






<h2>

How can I help you today?

</h2>







<p>

Ask questions, learn concepts, create ideas, and solve problems with your personal AI assistant.

</p>







</div>


)

}












{

messages.map((message,index)=>(



<MessageBubble


key={message._id || index}



messageId={message._id}


sender={message.sender}


text={message.text}


index={index}


onEdit={onEdit}


onRetry={onRetry}



/>



))

}









{

loading && <TypingIndicator/>

}





</div>



);


}



export default ChatWindow;