import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


function MessageBubble({sender,text}){


const user = sender==="user";


return(

<div className={user ? "message-row user-row" : "message-row ai-row"}>


<div className="message-avatar">

{
user ? "👤" : "🤖"
}

</div>



<div className="message-card">


<div className="message-name">

{
user ? "You" : "AI Assistant"
}

</div>



<div className="markdown-content">

<ReactMarkdown
remarkPlugins={[remarkGfm]}
>

{text}

</ReactMarkdown>


</div>



<span className="message-time">
Just now
</span>



</div>


</div>

)

}


export default MessageBubble;