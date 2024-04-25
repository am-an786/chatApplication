const express = require("express");
const cors =require("cors");
const mongoose = require("mongoose");
const   messageRoute = require("./routes/messagesRoutes");
const  userRoutes = require("./routes/userRoutes");
const socket = require("socket.io");

const app= express();

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoutes);
app.use("/api/messages",messageRoute );


app.get('/', (req,res)=>{
    res.status(200).json({
        message:"sucess",
        status: "ok"
    })
})


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
        origin:process.env.FRONT_END_ORIGIN,
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