require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../src/models/User");


const createAdmin = async()=>{


try{


await mongoose.connect(
process.env.MONGO_URI
);



console.log("MongoDB Connected");



const existingAdmin = await User.findOne({

email:"admin@aiassistant.com"

});



if(existingAdmin){

console.log("Admin already exists");

process.exit();

}





const hashedPassword = await bcrypt.hash(

"Admin@12345",

12

);





const admin = await User.create({


name:"System Admin",

email:"admin@aiassistant.com",

password:hashedPassword,

role:"admin"


});




console.log("Admin Created Successfully");

console.log({

email:admin.email,

password:"Admin@12345"

});



process.exit();



}


catch(error){


console.log(error);

process.exit(1);


}


};



createAdmin();