const jwt = require("jsonwebtoken");


const {
createUser,
verifyUser

}=require("../services/userService");





const generateToken=(user)=>{


return jwt.sign(

{

id:user._id,

email:user.email

},

process.env.JWT_SECRET,

{

expiresIn:"7d"

}

);


};







const register = async(req,res)=>{


try{


const {

name,

email,

password

}=req.body;




if(
!name ||
!email ||
!password
){

return res.status(400).json({

message:"All fields are required"

});

}




const user =
await createUser(

name,

email,

password

);





const token =
generateToken(user);





res.status(201).json({

message:"Account created successfully",

token,

user:{


id:user._id,

name:user.name,

email:user.email


}


});



}

catch(error){


res.status(400).json({

message:error.message

});


}



};









const login = async(req,res)=>{


try{


const {

email,

password

}=req.body;





const user =
await verifyUser(

email,

password

);





const token =
generateToken(user);





res.status(200).json({

message:"Login successful",

token,


user:{


id:user._id,

name:user.name,

email:user.email


}


});




}

catch(error){


res.status(401).json({

message:error.message

});


}



};






module.exports={

register,

login

};