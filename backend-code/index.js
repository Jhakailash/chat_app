const express=require('express');
const {Server}=require('socket.io')
const http=require("http")
const cors=require('cors');
// const {connection} = require('./config/db');
// const mongoose = require('./mongoose');
// connection();


const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://kailashjhaji7:abc@cluster0.eqescba.mongodb.net/chat-app?retryWrites=true&w=majority`);


const chatSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    message: { type: String, required: true },
    room: { type: String, required: true },
    time: { type: Date, default: Date.now }
  });

  
  // Define model for chat message
  const Chat = mongoose.model('Chat', chatSchema);

//   const User = mongoose.model('User', userSchema);
  
  // Save chat message to database
  const saveChatMessage = async (sender, message, room) => {
    const chatMessage = new Chat({ sender, message, room });
    // try {
    //     await chatMessage.save();
    //     console.log('Chat message saved successfully');
    //   } catch (err) {
    //     console.error('Error saving chat message:', err);
    //   }

    return chatMessage.save()
    .then((res) => {
        console.log(res)
      console.log('Chat message saved successfully');
    })
    .catch((err) => {
      console.error('Error saving chat message:', err);
      throw err; // re-throw the error to be caught by the caller
    });






  };














const app=express()
const port=process.env.PORT || 8080

app.use(cors())

const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})

io.on("connection", (socket) => {
    // console.log(socket.id); 

    socket.on('joinRoom', room=>socket.join(room))

    socket.on('newMessage',({newMessage,room})=>{
          console.log(newMessage,room)

          saveChatMessage(newMessage.name, newMessage.msg, room );



          io.in(room).emit("getNewMessage",newMessage)
    })
    
  });

// shema

  

  //

app.get('/',(req,res)=>{
    res.send("welcome")

})

server.listen(port,()=>{
  
    console.log(`this is ${port}`)})