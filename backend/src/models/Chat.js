const mongoose = require("mongoose");




// ===============================
// MESSAGE SCHEMA
// ===============================


const messageSchema = new mongoose.Schema({


    role:{


        type:String,


        enum:["user","assistant"],


        required:true


    },





    content:{


        type:String,


        required:true


    },





    // ===============================
    // FILE ATTACHMENT SUPPORT
    // ===============================


    attachment:{


        name:{


            type:String,


            default:null


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


            default:null


        },



        uploadedAt:{


            type:Date,


            default:null


        }


    },







    createdAt:{


        type:Date,


        default:Date.now


    }




});









// ===============================
// CHAT SCHEMA
// ===============================


const chatSchema = new mongoose.Schema({





    userId:{


        type:mongoose.Schema.Types.ObjectId,


        ref:"User",


        required:true


    },







    title:{


        type:String,


        default:"New Conversation"


    },









    messages:[


        messageSchema


    ],







    pinned:{


        type:Boolean,


        default:false


    },









    archived:{


        type:Boolean,


        default:false


    },









    important:{


        type:Boolean,


        default:false


    },









    createdAt:{


        type:Date,


        default:Date.now


    },









    updatedAt:{


        type:Date,


        default:Date.now


    }




});








// ===============================
// AUTO UPDATE TIMESTAMP
// MONGOOSE 9 COMPATIBLE
// ===============================


chatSchema.pre("save", async function(){


this.updatedAt = new Date();


});







module.exports = mongoose.model(

"Chat",

chatSchema

);