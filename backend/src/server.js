require("dotenv").config();


const express = require("express");

const cors = require("cors");



const connectDB =

require("./config/database");




const app = new express();





// =====================================

// DATABASE

// =====================================


connectDB();





// =====================================

// GLOBAL MIDDLEWARE

// =====================================


app.use(

cors()

);



app.use(

express.json()

);









// =====================================

// ROUTES

// =====================================


const chatRoutes =

require("./routes/chatRoutes");



const authRoutes =

require("./routes/authRoutes");



const chatHistoryRoutes =

require("./routes/chatHistoryRoutes");



const userRoutes =

require("./routes/userRoutes");



const adminRoutes =

require("./routes/adminRoutes");



// =====================================

// DOCUMENT ROUTES

// =====================================


const documentRoutes =

require("./routes/documentRoutes");








// =====================================

// CHAT API

// =====================================


app.use(

"/api/chat",

chatRoutes

);





// =====================================

// AUTHENTICATION API

// =====================================


app.use(

"/api/auth",

authRoutes

);





// =====================================

// CHAT HISTORY API

// =====================================


app.use(

"/api/chat-history",

chatHistoryRoutes

);





// =====================================

// USER PROFILE + SETTINGS API

// =====================================


app.use(

"/api/user",

userRoutes

);





// =====================================

// ADMIN API

// =====================================


app.use(

"/api/admin",

adminRoutes

);





// =====================================

// ADMIN DOCUMENT / KNOWLEDGE BASE API

// =====================================


// Final endpoints:
//
// POST   /api/admin/documents/upload
// GET    /api/admin/documents
// GET    /api/admin/documents/:id
// PUT    /api/admin/documents/:id
// DELETE /api/admin/documents/:id


app.use(

"/api/admin/documents",

documentRoutes

);









// =====================================

// HEALTH CHECK

// =====================================


app.get(

"/api/health",

(req,res)=>{


res.status(200).json({

status:"ok",

message:"MindVault AI backend is running"

});


}

);









// =====================================

// SERVER

// =====================================


const PORT =

process.env.PORT || 5000;





app.listen(

PORT,

()=>{


console.log(

`Server running on port ${PORT}`

);


}

);