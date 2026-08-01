import {

useState

} from "react";





function ChatInput({

onSend,

loading

}){



const [value,setValue]=useState("");





const send=()=>{


if(!value.trim() || loading)

return;



onSend(value);


setValue("");



};






return(


<div className="ai-composer">



<input


value={value}


placeholder="Message your AI assistant..."


onChange={(e)=>setValue(e.target.value)}


onKeyDown={(e)=>{


if(e.key==="Enter")

send();


}}


/>





<button

onClick={send}

disabled={loading}

>

➤

</button>





</div>


);



}


export default ChatInput;