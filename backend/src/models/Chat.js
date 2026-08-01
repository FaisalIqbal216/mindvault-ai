const mongoose = require("mongoose");


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


    createdAt:{
        type:Date,
        default:Date.now
    }


});




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



module.exports = mongoose.model(
"Chat",
chatSchema
);