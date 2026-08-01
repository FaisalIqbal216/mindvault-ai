const express = require("express");

const router = express.Router();


const {

getProfile,

updateProfile,

getSettings,

updateSettings

} = require("../controllers/userController");


const authMiddleware =
require("../middleware/authMiddleware");





// GET PROFILE

router.get(
"/profile",
authMiddleware,
getProfile
);




// UPDATE PROFILE

router.patch(
"/profile",
authMiddleware,
updateProfile
);




// GET SETTINGS

router.get(
"/settings",
authMiddleware,
getSettings
);




// UPDATE SETTINGS

router.patch(
"/settings",
authMiddleware,
updateSettings
);





module.exports = router;