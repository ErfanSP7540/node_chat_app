const Path = require('path')
const express = require('express')


var publicPath = Path.join(__dirname,'../public')

const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use(express.static(publicPath))


io.on('connection', (socket)=>{ // listening to connect a client to server
    console.log('new client connected ');

    socket.on('disconnect',()=>{
        console.log('A Client disconnected ');
    });

    socket.emit('newEmail',{
        from:"erfan@ut.ac.ir",
        text:"hello this is an Email"
    })

    socket.on('sendEmail',function (email) {
        console.log('new email from client',email);
    })

 });




 server.listen(3000 , ()=>{
     console.log('server Running On port 3000');
 });






