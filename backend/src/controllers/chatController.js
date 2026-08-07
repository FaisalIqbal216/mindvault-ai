const {
createChat,
addMessage,
getAIHistory
} = require("../services/chatMemory");


const processFile = require("../services/fileProcessor");


const Chat = require("../models/Chat");


const getAIResponse = require("../services/aiService");








// =================================
// CREATE / CONTINUE CHAT
// TEXT + FILE SUPPORT FINAL
// =================================


const chatController = async(req,res)=>{


try{


const {

message,

chatId

}=req.body;




const userId = req.user.id;


const file = req.file;



let currentChatId = chatId;




if(!currentChatId){


currentChatId = await createChat(userId);


}







// ===============================
// PROCESS ATTACHMENT
// ===============================


let attachment = null;

let fileContext = "";





if(file){



const processedFile = await processFile(file);




attachment={


name:processedFile.name,


type:processedFile.type,


mimeType:processedFile.mimeType,


size:processedFile.size,


uploadedAt:new Date()


};





fileContext = `


User uploaded a file.



File Name:
${processedFile.name}



File Type:
${processedFile.type}



Mime Type:
${processedFile.mimeType}




Extracted Content:


${processedFile.content}



`;



}









// ===============================
// SAVE USER MESSAGE
// ===============================


await addMessage(

currentChatId,

"user",

message || "Uploaded file",

attachment

);











// ===============================
// GET CHAT HISTORY
// ===============================


const history = await getAIHistory(

currentChatId

);









// ===============================
// ADD FILE CONTEXT FOR AI
// ===============================


if(fileContext){



history.push({


role:"user",


content:fileContext



});


}









// ===============================
// GENERATE AI RESPONSE
// ===============================


const answer = await getAIResponse(history);








// ===============================
// SAVE AI RESPONSE
// ===============================


await addMessage(

currentChatId,

"assistant",

answer

);







res.status(200).json({

chatId:currentChatId,

answer

});





}



catch(error){



console.log(

"CHAT ERROR:",

error

);




res.status(500).json({

message:"Chat failed"

});



}



};












// =================================
// EDIT MESSAGE
// =================================


const editMessage = async(req,res)=>{


try{


const {

chatId,

messageId

}=req.params;





const {

content

}=req.body;







const chat = await Chat.findOne({

_id:chatId,

userId:req.user.id

});







if(!chat){


return res.status(404).json({

message:"Chat not found"

});


}









const messageIndex = chat.messages.findIndex(

msg=>msg._id.toString()===messageId

);







if(messageIndex===-1){


return res.status(404).json({

message:"Message not found"

});


}











// UPDATE USER MESSAGE


chat.messages[messageIndex].content = content;









// REMOVE OLD AI RESPONSE


if(

chat.messages[messageIndex+1] &&

chat.messages[messageIndex+1].role==="assistant"

){


chat.messages.splice(

messageIndex+1,

1

);


}









chat.updatedAt=new Date();


await chat.save();











// GENERATE NEW RESPONSE


const history = await getAIHistory(chatId);



const answer = await getAIResponse(history);









chat.messages.push({

role:"assistant",

content:answer

});






await chat.save();









res.status(200).json({

answer,

chatId

});





}



catch(error){


console.log(

"EDIT MESSAGE ERROR",

error

);



res.status(500).json({

message:"Edit failed"

});



}



};











// =================================
// RETRY AI MESSAGE
// =================================


const retryMessage = async(req,res)=>{


try{


const {

chatId,

messageId

}=req.params;









const chat = await Chat.findOne({

_id:chatId,

userId:req.user.id

});








if(!chat){


return res.status(404).json({

message:"Chat not found"

});


}








const messageIndex = chat.messages.findIndex(

msg=>msg._id.toString()===messageId

);







if(messageIndex===-1){


return res.status(404).json({

message:"Message not found"

});


}











// REMOVE OLD AI MESSAGE


if(

chat.messages[messageIndex].role==="assistant"

){


chat.messages.splice(

messageIndex,

1

);


}









const history = await getAIHistory(chatId);






const answer = await getAIResponse(history);









chat.messages.push({

role:"assistant",

content:answer

});






chat.updatedAt=new Date();



await chat.save();








res.status(200).json({

answer

});






}



catch(error){



console.log(

"RETRY ERROR",

error

);



res.status(500).json({

message:"Retry failed"

});



}



};



// =================================
// GET ALL USER CHATS
// =================================


const getUserChats = async(req,res)=>{


try{


const userId=req.user.id;





const chats = await Chat.find({


userId:userId,



$or:[

{

archived:false

},

{

archived:{

$exists:false

}

}

]


})

.sort({

updatedAt:-1

})

.select(

"title updatedAt createdAt pinned important"

);







res.status(200).json(chats);



}



catch(error){


console.log(

"GET CHATS ERROR:",

error

);



res.status(500).json({

message:"Unable to load chats"

});



}



};













// =================================
// GET SINGLE CHAT
// =================================


const getSingleChat = async(req,res)=>{


try{


const chat = await Chat.findOne({

_id:req.params.id,

userId:req.user.id

});






if(!chat){


return res.status(404).json({

message:"Chat not found"

});


}






res.status(200).json(chat);



}



catch(error){


console.log(error);



res.status(500).json({

message:"Unable to load chat"

});


}



};












// =================================
// DELETE CHAT
// =================================


const deleteChat = async(req,res)=>{


try{


const deleted = await Chat.findOneAndDelete({

_id:req.params.id,

userId:req.user.id

});






if(!deleted){


return res.status(404).json({

message:"Chat not found"

});


}







res.status(200).json({

message:"Chat deleted successfully"

});



}



catch(error){


console.log(error);



res.status(500).json({

message:"Delete failed"

});


}



};












// =================================
// RENAME CHAT
// =================================


const renameChat = async(req,res)=>{


try{


const chat = await Chat.findOneAndUpdate(


{

_id:req.params.id,

userId:req.user.id

},



{

title:req.body.title,

updatedAt:new Date()

},



{

new:true

}



);







res.status(200).json(chat);



}



catch(error){


console.log(error);



res.status(500).json({

message:"Rename failed"

});


}



};












// =================================
// PIN CHAT
// =================================


const pinChat = async(req,res)=>{


try{


const chat = await Chat.findOneAndUpdate(


{

_id:req.params.id,

userId:req.user.id

},



{

pinned:req.body.pinned,

updatedAt:new Date()

},



{

new:true

}


);







res.status(200).json(chat);



}



catch(error){


console.log(error);



res.status(500).json({

message:"Pin failed"

});


}



};












// =================================
// ARCHIVE CHAT
// =================================


const archiveChat = async(req,res)=>{


try{


const chat = await Chat.findOneAndUpdate(


{

_id:req.params.id,

userId:req.user.id

},



{

archived:true,

updatedAt:new Date()

},



{

new:true

}


);







res.status(200).json(chat);



}



catch(error){


console.log(error);



res.status(500).json({

message:"Archive failed"

});


}



};















// =================================
// IMPORTANT CHAT
// =================================


const importantChat = async(req,res)=>{


try{


const chat = await Chat.findOneAndUpdate(


{

_id:req.params.id,

userId:req.user.id

},



{

important:req.body.important,

updatedAt:new Date()

},



{

new:true

}


);







res.status(200).json(chat);



}



catch(error){


console.log(error);



res.status(500).json({

message:"Important failed"

});


}



};












// =================================
// EXPORTS
// =================================


module.exports={


chatController,


editMessage,


retryMessage,


getUserChats,


getSingleChat,


deleteChat,


renameChat,


pinChat,


archiveChat,


importantChat


};