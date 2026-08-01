import axios from "axios";



const API = axios.create({

baseURL:"http://localhost:5000/api"

});







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
// ===============================


export const sendMessage = async(message, chatId)=>{


const response =
await API.post("/chat",{

message,

chatId

});


return response.data;


};









// ===============================
// AUTH
// ===============================


export const loginUser = async(data)=>{


const response =
await API.post("/auth/login",data);


return response.data;


};






export const registerUser = async(data)=>{


const response =
await API.post("/auth/register",data);


return response.data;


};









// ===============================
// USER PROFILE
// ===============================


export const getProfile = async()=>{


const response =
await API.get("/user/profile");


return response.data;


};







export const updateProfile = async(data)=>{


const response =
await API.patch(

"/user/profile",

data

);


return response.data;


};









// ===============================
// USER SETTINGS
// ===============================


export const getSettings = async()=>{


const response =
await API.get("/user/settings");


return response.data;


};







export const updateSettings = async(data)=>{


const response =
await API.patch(

"/user/settings",

data

);


return response.data;


};









export default API;