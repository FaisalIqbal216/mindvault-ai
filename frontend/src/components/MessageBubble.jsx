import ReactMarkdown from "react-markdown";

import {
Copy,
Edit3,
RefreshCw
} from "lucide-react";

import {
useState
} from "react";





function MessageBubble({

messageId,

sender,

text,

index,

onEdit,

onRetry

}){


const isUser = sender==="user";


const [copied,setCopied]=useState(false);






const copyMessage=async()=>{


try{


await navigator.clipboard.writeText(text);



setCopied(true);




setTimeout(()=>{


setCopied(false);


},2000);



}

catch(error){


console.log(

"Copy failed",

error

);



}



};









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









<div className="ai-message-actions">







<button

className="ai-message-action-btn ai-copy-action"

onClick={copyMessage}

title="Copy"

>


<Copy size={15}/>


<span>


{

copied

?

"Copied ✓"

:

"Copy"

}



</span>


</button>













{

isUser &&


<button

className="ai-message-action-btn ai-edit-action"


onClick={()=>{


if(onEdit){


onEdit(

text,

messageId,

index

);


}



}}



title="Edit"

>


<Edit3 size={15}/>


<span>

Edit

</span>


</button>



}














{

!isUser &&


<button

className="ai-message-action-btn ai-retry-action"


onClick={()=>{


if(onRetry){


onRetry(

messageId,

index

);



}



}}




title="Try Again"

>


<RefreshCw size={15}/>


<span>

Try Again

</span>


</button>



}









</div>









</div>








</div>



);



}



export default MessageBubble;