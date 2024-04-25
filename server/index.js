const express = require("express");
const cors =require("cors");
const mongoose = require("mongoose");
const  userRoutes = require("./routes/messagesRoutes");
const  messageRoute = require("./routes/userRoutes");
const socket = require("socket.io");

const app= express();

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoutes);
app.use("/api/messages",messageRoute);


//DataBAse Connection
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DataBase is connected successfully");
}).catch((error)=>{
    console.log(error)
})

// mdaman8677
// qOSg4SV11pnnoEOK

// Server Connection
const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port number ${process.env.PORT}`); 
});

const io = socket(server, {
    cors:{
        origin:"http://localhost:3000",
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket)=>{
    global.chatSocket = socket;
    
    socket.on("add-user", (userId)=>{
            onlineUsers.set(userId,socket.id);
    });

    socket.on("send-msg", (data)=>{
        
        const sendUserSocket = onlineUsers.get(data.to);

        if(sendUserSocket){
             socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    });
});