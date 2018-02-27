const Path = require('path')
const express = require('express')


var publicPath = Path.join(__dirname,'../public')

const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use(express.static(publicPath))


io.on('connection', (socket)=>{ // listening to connect a client to server
    console.log('new client connected ');
    
    socket.emit('newMessage',{
        from:"John",
        text:"see you then",
        createAt:12312
    })
    
    socket.on('createMessage', (message)=> {
        console.log('createMesage:',message);
    })

    socket.on('disconnect',()=>{
        console.log('A Client disconnected ');
    });

 });




 server.listen(3000 , ()=>{
     console.log('server Running On port 3000');
 });






