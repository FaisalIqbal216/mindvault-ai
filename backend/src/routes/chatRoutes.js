const express = require("express");

const router = express.Router();



const {

chatController,

getUserChats,

getSingleChat,

deleteChat,

renameChat,

pinChat,

archiveChat,

importantChat


}=require("../controllers/chatController");



const authMiddleware =
require("../middleware/authMiddleware");






// CREATE CHAT

router.post(

"/",

authMiddleware,

chatController

);






// GET ALL CHATS

router.get(

"/",

authMiddleware,

getUserChats

);






// RENAME

router.patch(

"/:id/rename",

authMiddleware,

renameChat

);






// PIN

router.patch(

"/:id/pin",

authMiddleware,

pinChat

);






// ARCHIVE

router.patch(

"/:id/archive",

authMiddleware,

archiveChat

);






// IMPORTANT

router.patch(

"/:id/important",

authMiddleware,

importantChat

);






// SINGLE CHAT

router.get(

"/:id",

authMiddleware,

getSingleChat

);






// DELETE

router.delete(

"/:id",

authMiddleware,

deleteChat

);






module.exports = router;