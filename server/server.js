const Path = require('path')
const express = require('express')


var publicPath = Path.join(__dirname,'../public')

const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use(express.static(publicPath))


io.on('connection', (client)=>{ 
    console.log('new client connected ');
    client.on('disconnect',()=>{ console.log('A client disconnected ');});
 });


 server.listen(3000 , ()=>{
     console.log('server Running On port 3000');
 });


