const express = require("express");


const router = express.Router();



const authMiddleware =
require("../middleware/authMiddleware");


const roleMiddleware =
require("../middleware/roleMiddleware");



const {


adminDashboard,


getAdminStats,


getAdminUsers,


getUserChats



}=require("../controllers/adminController");







// =====================================
// ADMIN HOME
// =====================================


router.get(


"/dashboard",


authMiddleware,


roleMiddleware("admin"),


adminDashboard


);









// =====================================
// ADMIN STATISTICS
// =====================================


router.get(


"/stats",


authMiddleware,


roleMiddleware("admin"),


getAdminStats


);









// =====================================
// USERS LIST WITH CHAT COUNT
// =====================================


router.get(


"/users",


authMiddleware,


roleMiddleware("admin"),


getAdminUsers


);









// =====================================
// SINGLE USER CHAT TITLES
// =====================================


router.get(


"/users/:id/chats",


authMiddleware,


roleMiddleware("admin"),


getUserChats


);








module.exports = router;