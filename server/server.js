const Path = require('path')
const express = require('express')
const {generateMessage} = require('./utils/message')

var publicPath = Path.join(__dirname,'../public')

const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use(express.static(publicPath))


io.on('connection', (socket)=>{ // listening to connect a client to server
    console.log('new client connected ');
    socket.emit('newMessage',{ from:'Admin', text:'wellcome to chatroom '}) 
    socket.broadcast.emit('newMessage',{ from:'Admin', text:'new user Added to ChatRoom'})
    // socket.emit('AdminMessage',generateMessage('Admin','wellcome to this chatRoom'))
    // socket.broadcast.emit('AdminMessage',generateMessage('Admin','New User Added to This Room'))

    socket.on('createMesage', (data)=> {
            console.log('createMesage:',data);
            io.emit('newMessage',data) 
    })

    // socket.on('disconnect',()=>{
    //     console.log('A Client disconnected ');
    // });

    // socket.on(
    //     'sendMsgCallback',
    //     (message , callback )=>{
    //        console.log('sendMsgCallback :' , message );
    //        callback('callback Message')
    //     }
    // )

 });




 server.listen(3000 , ()=>{
     console.log('server Running On port 3000');
 });






