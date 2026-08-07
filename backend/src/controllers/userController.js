const User = require("../models/User");





// GET PROFILE

const getProfile = async(req,res)=>{

try{


const user = await User.findById(req.user.id)
.select("-password")
.lean();



res.status(200).json(user);



}

catch(error){


console.log(error);


res.status(500).json({

message:"Unable to load profile"

});


}


};











// UPDATE PROFILE

const updateProfile = async(req,res)=>{

try{


const user = await User.findByIdAndUpdate(

req.user.id,

{

name:req.body.name

},

{

new:true

}

)

.select("-password");




res.status(200).json(user);



}

catch(error){


console.log(error);


res.status(500).json({

message:"Profile update failed"

});


}


};











// GET SETTINGS

const getSettings = async(req,res)=>{


try{


const user = await User.findById(

req.user.id

)

.select(

"settings"

);



res.status(200).json(

user.settings || {

darkMode:true,

saveHistory:true,

autoTitle:true

}

);



}


catch(error){


console.log(error);


res.status(500).json({

message:"Unable to load settings"

});


}


};











// UPDATE SETTINGS

const updateSettings = async(req,res)=>{


try{


const user = await User.findByIdAndUpdate(

req.user.id,

{

settings:req.body

},

{

new:true

}

)

.select(

"settings"

);



res.status(200).json(

user.settings

);



}

catch(error){


console.log(error);


res.status(500).json({

message:"Settings update failed"

});


}



};








module.exports={


getProfile,

updateProfile,

getSettings,

updateSettings


};