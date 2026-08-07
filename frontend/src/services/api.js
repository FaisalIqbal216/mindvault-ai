import axios from "axios";



const API = axios.create({

baseURL:"http://localhost:5000/api"

});







// ===============================
// AUTH TOKEN
// ===============================


API.interceptors.request.use(

(config)=>{


const token =
localStorage.getItem("token");



if(token){

config.headers.Authorization =
`Bearer ${token}`;

}



return config;


}

);








// ===============================
// CHAT
// TEXT + IMAGE + DOCUMENT SUPPORT
// ===============================


export const sendMessage = async(

message,

chatId,

file

)=>{


try{


const formData = new FormData();



formData.append(

"message",

message || ""

);





if(chatId){


formData.append(

"chatId",

chatId

);


}





if(file){


formData.append(

"file",

file

);


}





const response = await API.post(

"/chat",

formData

);



return response.data;



}

catch(error){


console.log(

"SEND MESSAGE ERROR:",

error

);


throw error;


}



};









// ===============================
// EDIT MESSAGE
// ===============================


export const editMessage = async(

chatId,

messageId,

content

)=>{


const response = await API.patch(

`/chat/${chatId}/message/${messageId}`,

{

content

}

);



return response.data;


};











// ===============================
// RETRY MESSAGE
// ===============================


export const retryMessage = async(

chatId,

messageId

)=>{


const response = await API.post(

`/chat/${chatId}/retry/${messageId}`

);



return response.data;


};











// ===============================
// AUTH
// ===============================


export const loginUser = async(data)=>{


const response = await API.post(

"/auth/login",

data

);



return response.data;


};








export const registerUser = async(data)=>{


const response = await API.post(

"/auth/register",

data

);



return response.data;


};












// ===============================
// USER PROFILE
// ===============================


export const getProfile = async()=>{


const response = await API.get(

"/user/profile"

);



return response.data;


};








export const updateProfile = async(data)=>{


const response = await API.patch(

"/user/profile",

data

);



return response.data;


};











// ===============================
// USER SETTINGS
// ===============================


export const getSettings = async()=>{


const response = await API.get(

"/user/settings"

);



return response.data;


};








export const updateSettings = async(data)=>{


const response = await API.patch(

"/user/settings",

data

);



return response.data;


};









export default API;