require("dotenv").config();


const express = require("express");
const cors = require("cors");


const connectDB = require("./config/database");



const app = express();



// Database Connection

connectDB();



// Middlewares

app.use(
    cors()
);


app.use(
    express.json()
);



// Routes

const chatRoutes = require("./routes/chatRoutes");

const authRoutes = require("./routes/authRoutes");

const chatHistoryRoutes =
require("./routes/chatHistoryRoutes");

const userRoutes =
require("./routes/userRoutes");



const adminRoutes =
require("./routes/adminRoutes");
// Chat API

app.use(
    "/api/chat",
    chatRoutes
);



// Authentication API

app.use(
    "/api/auth",
    authRoutes
);



// Chat History API

app.use(
    "/api/chat-history",
    chatHistoryRoutes
);



// User Profile + Settings API

app.use(
    "/api/user",
    userRoutes
);



app.use(

"/api/admin",

adminRoutes

);

// Server

app.listen(
    5000,
    ()=>{

        console.log(
            "Server running on port 5000"
        );

    }
);