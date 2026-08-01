const express = require("express");

const router = express.Router();


const authMiddleware =
require("../middleware/authMiddleware");


const {

getUserChats,

getSingleChat

}=require("../controllers/chatHistoryController");




router.get(

"/",

authMiddleware,

getUserChats

);



router.get(

"/:id",

authMiddleware,

getSingleChat

);




module.exports=router;