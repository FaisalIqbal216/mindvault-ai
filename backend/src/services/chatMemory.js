const Chat = require("../models/Chat");




// ===============================
// CREATE CHAT
// ===============================


const createChat = async(userId)=>{


const chat = await Chat.create({


userId,


title:"New Conversation",


messages:[]


});



return chat._id;



};









// ===============================
// ADD MESSAGE
// TEXT + ATTACHMENT SUPPORT
// ===============================


const addMessage = async(


chatId,


role,


content,


attachment=null


)=>{


await Chat.findByIdAndUpdate(


chatId,



{


$push:{


messages:{


role,


content,


attachment: attachment || null



}


},



updatedAt:new Date()



}



);



};












// ===============================
// GET CHAT MESSAGES
// FRONTEND DISPLAY
// ===============================


const getChatMessages = async(chatId)=>{


const chat = await Chat.findById(chatId);





if(!chat)


return [];










return chat.messages.map(msg=>(



{


_id:msg._id,


role:msg.role,


content:msg.content,


attachment:msg.attachment || null



}



));



};














// ===============================
// GET AI HISTORY
// GROQ CONTEXT
// ===============================


// IMPORTANT:
// Only send file information when that
// message actually contains attachment.
// Do not keep injecting old files into
// every next conversation message.


const getAIHistory = async(chatId)=>{


const chat = await Chat.findById(chatId);





if(!chat)


return [];









return chat.messages.map(msg=>(



{


role:msg.role,



content:

msg.attachment

?



`${msg.content}



Uploaded File Information:



File Name:

${msg.attachment.name || "Unknown"}



File Type:

${msg.attachment.fileType || "Unknown"}



Mime Type:

${msg.attachment.mimeType || "Unknown"}



File Size:

${msg.attachment.size || 0} bytes



Please analyze this uploaded file only when the user asks about it.`



:



msg.content



}



));



};















module.exports={


createChat,


addMessage,


getChatMessages,


getAIHistory


};