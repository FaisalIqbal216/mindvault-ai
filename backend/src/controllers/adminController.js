const User = require("../models/User");
const Chat = require("../models/Chat");
const Document = require("../models/Document");




// =====================================
// ADMIN DASHBOARD BASIC CHECK
// =====================================


const adminDashboard = async(req,res)=>{


try{


res.status(200).json({

message:"Welcome Admin",

user:req.user

});


}


catch(error){


console.log(
"ADMIN DASHBOARD ERROR:",
error
);


res.status(500).json({

message:"Unable to load admin dashboard"

});


}



};









// =====================================
// GET ADMIN STATISTICS
// =====================================


const getAdminStats = async(req,res)=>{


try{


const totalUsers =
await User.countDocuments();



const totalChats =
await Chat.countDocuments();



const totalDocuments =
await Document.countDocuments();




res.status(200).json({

totalUsers,

totalChats,

totalDocuments

});



}


catch(error){


console.log(

"ADMIN STATS ERROR:",

error

);



res.status(500).json({

message:"Unable to load statistics"

});


}



};










// =====================================
// GET ALL USERS WITH CHAT COUNT
// =====================================


const getAdminUsers = async(req,res)=>{


try{


const users =
await User.find()

.select(
"-password"
)

.lean();






const usersWithChats =
await Promise.all(


users.map(async(user)=>{


const totalChats =
await Chat.countDocuments({

userId:user._id

});




return{

id:user._id.toString(),

name:user.name,


email:user.email,


role:user.role,


totalChats,


createdAt:user.createdAt



};



})


);






res.status(200).json(

usersWithChats

);



}



catch(error){


console.log(
"ADMIN USERS ERROR:",
error
);



res.status(500).json({

message:"Unable to load users"

});


}



};












// =====================================
// GET USER CHAT LIST
// ONLY TITLE + DATE
// NO MESSAGE CONTENT
// =====================================


const getUserChats = async(req,res)=>{


try{


const {id}=req.params;



const chats =
await Chat.find({

userId:id

})

.select(
"title createdAt updatedAt"
)

.sort({

createdAt:-1

})

.lean();





res.status(200).json(chats);



}


catch(error){


console.log(
"USER CHAT LIST ERROR:",
error
);



res.status(500).json({

message:"Unable to load user chats"

});


}



};












module.exports={


adminDashboard,


getAdminStats,


getAdminUsers,


getUserChats


};