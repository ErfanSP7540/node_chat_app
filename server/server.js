const Path = require('path')
const express = require('express')
const {generateMessage ,generateGeolocationMessage} = require('./utils/message')
const {Users} = require('./utils/users')

var publicPath = Path.join(__dirname,'../public')

const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use(express.static(publicPath))

var users = new Users();

io.on('connection', (socket)=>{ // listening to connect a client to server
    console.log('new client connected ');

    
    socket.on('join',(params,callback)=>{

        var { isRealString } = require('./utils/validation')
        if(  !isRealString(params.name) ||   !isRealString(params.room)){
           return  callback(true)
        }

        users.removeUser(socket.id);
        users.addUser(socket.id , params.name , params.room );
        console.log(users.users)


        socket.join( params.room);
        io.to(params.room).emit( 'UpdateUserList', users.getUserList(params.room) )


        socket.emit('newMessage',generateMessage('Admin','wellcome to this chatRoom')) 
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',` ${params.name} entered the  ${params.room} `))

        socket.on('createMesage', (data,callback)=> {
                console.log('createMesage:',data);
                io.to(params.room).emit('newMessage',data)
                callback(true);
        })
    
        socket.on('createGeolocation',(position , callback)=>{
            io.to(params.room).emit('geoLocationMessage',generateGeolocationMessage(position.from , position.latitude , position.longitude) )
            callback()
        })

        socket.on('disconnect',()=>{
            users.removeUser(socket.id);
            io.to(params.room).emit( 'UpdateUserList', users.getUserList(params.room)  )
            io.to(params.room).emit( 'newMessage', generateMessage('Admin',` ${params.name} left  Room`)  )
        })


    })

 });




 server.listen(3000 , ()=>{
     console.log('server Running On port 3000');
 });






