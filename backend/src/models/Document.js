const mongoose = require("mongoose");


const documentSchema = new mongoose.Schema(


{

name:{


type:String,

required:true,

trim:true


},



originalName:{


type:String,

default:null


},



fileType:{


type:String,

default:null


},



mimeType:{


type:String,

default:null


},



filePath:{


type:String,

default:null


},



size:{


type:Number,

default:0


},



uploadedBy:{


type:mongoose.Schema.Types.ObjectId,

ref:"User",

default:null


},



status:{


type:String,

enum:[
"processing",
"completed",
"failed"
],

default:"processing"


}



},


{


timestamps:true


}



);



module.exports =
mongoose.model(
"Document",
documentSchema
);