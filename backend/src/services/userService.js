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

password:hashedPassword

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



return user;



};





module.exports={

createUser,

verifyUser

};