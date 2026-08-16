const bcrypt = require("bcrypt");

const User = require("../models/User");





const createUser = async(
name,
email,
password
)=>{


const existingUser =
await User.findOne({
email
});


if(existingUser){

throw new Error(
"Email already registered"
);

}



const hashedPassword =
await bcrypt.hash(
password,
12
);



const user =
await User.create({

name,

email,

password:hashedPassword,

role:"user"


});



return user;


};









const verifyUser = async(
email,
password
)=>{


const user =
await User.findOne({
email
});



if(!user){

throw new Error(
"Invalid email or password"
);

}



const isMatch =
await bcrypt.compare(
password,
user.password
);



if(!isMatch){

throw new Error(
"Invalid email or password"
);

}




// OLD USERS SAFETY

if(!user.role){

user.role="user";

await user.save();

}



return user;


};









// =====================================
// CHANGE PASSWORD
// =====================================


const changeUserPassword = async(

userId,

currentPassword,

newPassword

)=>{


const user =
await User.findById(userId);



if(!user){


throw new Error(
"User not found"
);


}





const isMatch =
await bcrypt.compare(

currentPassword,

user.password

);





if(!isMatch){


throw new Error(
"Current password is incorrect"
);


}





const hashedPassword =
await bcrypt.hash(

newPassword,

12

);





user.password =
hashedPassword;



await user.save();





return user;


};









module.exports={


createUser,


verifyUser,


changeUserPassword


};