const {
    createChat,
    addMessage,
    getChatMessages
} = require("../services/chatMemory");


const Chat = require("../models/Chat");


const getAIResponse = require("../services/aiService");




// =================================
// CREATE / CONTINUE CHAT
// =================================

const chatController = async(req,res)=>{


try{


const {

message,

chatId

}=req.body;



const userId = req.user.id;



let currentChatId = chatId;



if(!currentChatId){


currentChatId = await createChat(userId);


}





await addMessage(

currentChatId,

"user",

message

);






const history = await getChatMessages(

currentChatId

);





const answer = await getAIResponse(history);






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
// GET ALL USER CHATS
// =================================

const getUserChats = async(req,res)=>{


try{


const userId = req.user.id;



console.log(
"LOGIN USER ID:",
userId
);




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





console.log(
"TOTAL CHATS FOUND:",
chats.length
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








module.exports={


chatController,

getUserChats,

getSingleChat,

deleteChat,

renameChat,

pinChat,

archiveChat,

importantChat


};