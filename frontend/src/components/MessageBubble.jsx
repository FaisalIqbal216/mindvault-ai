import ReactMarkdown from "react-markdown";



function MessageBubble({

sender,

text

}){



const isUser = sender==="user";



return(


<div

className={

`message-row ${

isUser

?

"user-row"

:

""

}`

}


>



<div className="message-avatar">


{

isUser

?

"👤"

:

"🤖"

}


</div>






<div className="message-card">


<div className="message-name">


{

isUser

?

"You"

:

"AI Assistant"

}


</div>






<div className="markdown-content">


<ReactMarkdown>

{text}

</ReactMarkdown>


</div>





</div>






</div>


);


}


export default MessageBubble;