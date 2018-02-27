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
    
    socket.emit('AdminMessage',generateMessage('Admin','wellcome to this chatRoom'))
    socket.broadcast.emit('AdminMessage',generateMessage('Admin','New User Added to This Room'))

    socket.on('createMessage', (message)=> {
        console.log('createMesage:',message);
        
        //// >> emit new message to every client 
        // io.emit('newMessage',{
        //         from:message.from,
        //         text:message.text,
        //         createAt:new Date().getTime()
        //     })

        //// > emit new message to every client  except this user
        // socket.broadcast.emit('newMessage',{
        //     from:message.from,
        //     text:message.text,
        //     createAt:new Date().getTime()
        // })    
    })

    socket.on('disconnect',()=>{
        console.log('A Client disconnected ');
    });

    socket.on(
        'sendMsgCallback',
        (message , callback )=>{
           console.log('sendMsgCallback :' , message );
           callback('callback Message')
        }
    )

 });




 server.listen(3000 , ()=>{
     console.log('server Running On port 3000');
 });






