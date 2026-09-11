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





const documentRoutes =
require("./documentRoutes");








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
// USERS LIST
// =====================================


router.get(


"/users",


authMiddleware,


roleMiddleware("admin"),


getAdminUsers


);









// =====================================
// USER CHAT TITLES
// =====================================


router.get(


"/users/:id/chats",


authMiddleware,


roleMiddleware("admin"),


getUserChats


);









// =====================================
// DOCUMENT MANAGEMENT
// =====================================


router.use(


"/documents",


documentRoutes


);








module.exports = router;