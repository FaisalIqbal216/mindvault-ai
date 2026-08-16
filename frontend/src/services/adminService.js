import API from "./api";




// ===============================
// ADMIN STATISTICS
// ===============================


export const getAdminStats = async()=>{


const response =
await API.get(

"/admin/stats"

);


return response.data;


};






// ===============================
// USERS WITH CHAT COUNT
// ===============================


export const getAdminUsers = async()=>{


const response =
await API.get(

"/admin/users"

);


return response.data;


};






// ===============================
// USER CHAT TITLES ONLY
// ===============================


export const getUserChats = async(userId)=>{


const response =
await API.get(

`/admin/users/${userId}/chats`

);


return response.data;


};







// ===============================
// CHANGE PASSWORD
// ===============================


export const changePassword = async(data)=>{


const response =
await API.put(

"/user/change-password",

data

);


return response.data;


};