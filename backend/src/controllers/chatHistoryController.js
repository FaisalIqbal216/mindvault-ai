const Chat = require("../models/Chat");


// Get all chats of logged in user

const getUserChats = async(req,res)=>{


try{


const chats = await Chat.find({

userId:req.user.id

})
.sort({

updatedAt:-1

})
.select(

"title createdAt updatedAt"

);



res.json(chats);



}

catch(error){


console.log(error);


res.status(500).json({

message:"Unable to fetch chats"

});


}


};





// Get single chat complete history


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



res.json(chat);



}

catch(error){


res.status(500).json({

message:"Unable to load chat"

});


}


};





module.exports={

getUserChats,

getSingleChat

};