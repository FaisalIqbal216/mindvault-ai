import axios from "axios";



const API = axios.create({

    baseURL:"http://localhost:5000/api"

});





export const sendMessage = async(

message,

chatId

)=>{


try{


const response = await API.post(

"/chat",

{

message,

chatId

}

);



return response.data;



}

catch(error){


console.log(

"API Error:",

error

);


throw error;


}


};