const mongoose = require("mongoose");



const userSchema = new mongoose.Schema(

{

name:{

type:String,

required:true,

trim:true,

minLength:3

},



email:{

type:String,

required:true,

unique:true,

lowercase:true,

trim:true

},



password:{

type:String,

required:true

},




// NEW SETTINGS FIELD
// Existing users ke liye bhi safe hai

settings:{

darkMode:{

type:Boolean,

default:true

},


saveHistory:{

type:Boolean,

default:true

},


autoTitle:{

type:Boolean,

default:true

}

},





createdAt:{

type:Date,

default:Date.now

}



},


{

timestamps:true

}

);



module.exports = mongoose.model(
"User",
userSchema
);