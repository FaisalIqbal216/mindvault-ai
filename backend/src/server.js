require("dotenv").config();

const express=require("express");
const cors=require("cors");

const connectDB=require("./config/database");


const app=express();


connectDB();


app.use(cors());
app.use(express.json());


const chatRoutes=require("./routes/chatRoutes");


app.use("/api/chat",chatRoutes);



app.listen(5000,()=>{

console.log("Server running on port 5000");

});