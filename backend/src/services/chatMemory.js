const Chat = require("../models/Chat");



const createChat = async()=>{


    const chat = await Chat.create({

        title:"New Conversation",
        messages:[]

    });


    return chat._id;


};





const addMessage = async(chatId,role,content)=>{


    await Chat.findByIdAndUpdate(

        chatId,


        {

            $push:{
                messages:{
                    role,
                    content
                }
            },


            updatedAt:new Date()

        }


    );


};






const getChatMessages = async(chatId)=>{


    const chat = await Chat.findById(chatId);


    if(!chat)
        return [];



    return chat.messages.map(msg=>({


        role:msg.role,


        content:msg.content


    }));


};






module.exports={

createChat,

addMessage,

getChatMessages

};