import API from "./api";




// =================================
// GET ALL USER CHATS
// =================================

export const getChats = async()=>{


const response = await API.get(

"/chat"

);


return response.data;


};







// =================================
// GET SINGLE CHAT
// =================================

export const getChatById = async(id)=>{


const response = await API.get(

`/chat/${id}`

);


return response.data;


};







// =================================
// RENAME CHAT
// =================================

export const renameChat = async(id,title)=>{


const response = await API.patch(

`/chat/${id}/rename`,

{

title

}

);


return response.data;


};







// =================================
// DELETE CHAT
// =================================

export const deleteChat = async(id)=>{


const response = await API.delete(

`/chat/${id}`

);


return response.data;


};







// =================================
// PIN CHAT
// =================================

export const pinChat = async(id,pinned)=>{


const response = await API.patch(

`/chat/${id}/pin`,

{

pinned

}

);


return response.data;


};







// =================================
// ARCHIVE CHAT
// =================================

export const archiveChat = async(id)=>{


const response = await API.patch(

`/chat/${id}/archive`

);


return response.data;


};







// =================================
// IMPORTANT CHAT
// =================================

export const importantChat = async(id,important)=>{


const response = await API.patch(

`/chat/${id}/important`,

{

important

}

);


return response.data;


};