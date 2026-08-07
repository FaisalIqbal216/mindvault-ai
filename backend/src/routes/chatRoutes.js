const express = require("express");

const router = express.Router();



const multer = require("multer");





const {

chatController,

editMessage,

retryMessage,

getUserChats,

getSingleChat,

deleteChat,

renameChat,

pinChat,

archiveChat,

importantChat


}=require("../controllers/chatController");





const authMiddleware = require("../middleware/authMiddleware");









// =================================
// FILE UPLOAD CONFIGURATION
// =================================


// Memory storage
// File directly AI processing ke liye memory me available hogi


const storage = multer.memoryStorage();





const fileFilter = (req,file,cb)=>{


const allowedTypes=[


"image/png",

"image/jpeg",

"image/jpg",

"image/webp",


"application/pdf",


"text/plain",


"application/msword",


"application/vnd.openxmlformats-officedocument.wordprocessingml.document"


];






if(allowedTypes.includes(file.mimetype)){


cb(null,true);


}

else{


cb(

new Error("Unsupported file type"),

false

);


}


};









const upload = multer({


storage,



limits:{


fileSize:20 * 1024 * 1024


},



fileFilter



});












// =================================
// CREATE CHAT
// TEXT + IMAGE + DOCUMENT
// =================================


router.post(


"/",


authMiddleware,


upload.single("file"),


chatController


);












// =================================
// GET ALL CHATS
// =================================


router.get(


"/",


authMiddleware,


getUserChats


);












// =================================
// EDIT MESSAGE
// =================================


router.patch(


"/:chatId/message/:messageId",


authMiddleware,


editMessage


);












// =================================
// RETRY AI MESSAGE
// =================================


router.post(


"/:chatId/retry/:messageId",


authMiddleware,


retryMessage


);












// =================================
// RENAME
// =================================


router.patch(


"/:id/rename",


authMiddleware,


renameChat


);












// =================================
// PIN
// =================================


router.patch(


"/:id/pin",


authMiddleware,


pinChat


);












// =================================
// ARCHIVE
// =================================


router.patch(


"/:id/archive",


authMiddleware,


archiveChat


);












// =================================
// IMPORTANT
// =================================


router.patch(


"/:id/important",


authMiddleware,


importantChat


);












// =================================
// SINGLE CHAT
// =================================


router.get(


"/:id",


authMiddleware,


getSingleChat


);












// =================================
// DELETE
// =================================


router.delete(


"/:id",


authMiddleware,


deleteChat


);












// =================================
// MULTER ERROR HANDLER
// =================================


router.use((err,req,res,next)=>{


if(err instanceof multer.MulterError){


return res.status(400).json({


message:err.message


});


}




if(err){


return res.status(400).json({


message:err.message


});


}



next();



});









module.exports = router;