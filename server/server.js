const Path = require('path')
const express = require('express')


var publicPath = Path.join(__dirname,'../public')

const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use(express.static(publicPath))


io.on('connection', (socket)=>{ // listening to connect a client to server
    console.log('new client connected ');
    
    socket.emit('AdminMessage',{
        from:'Admin',
        text:'wellcome to this chatRoom',
        createAt:new Date().getTime()
    })

    socket.broadcast.emit('AdminMessage',{
        from:'Admin',
        text:'New User Added to This Room ',
        createAt:new Date().getTime()
    })

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

 });




 server.listen(3000 , ()=>{
     console.log('server Running On port 3000');
 });






