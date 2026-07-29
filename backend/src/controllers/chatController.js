const {
createChat,
addMessage,
getChatMessages

}=require("../services/chatMemory");


const getAIResponse=require("../services/aiService");




const chatController=async(req,res)=>{


try{


let {

message,

chatId

}=req.body;



let currentChatId=chatId;



// create new conversation

if(!currentChatId){

currentChatId=await createChat();

}




await addMessage(

currentChatId,

"user",

message

);





const history =
await getChatMessages(currentChatId);




const answer =
await getAIResponse(history);





await addMessage(

currentChatId,

"assistant",

answer

);





res.json({


chatId:currentChatId,


answer


});




}

catch(error){


console.log(error);


res.status(500).json({

error:"Server Error"

});


}



};




module.exports=chatController;