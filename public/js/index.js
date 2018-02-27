
var socket = io();

socket.on('connect', function(){ // listening to connection
     console.log('connect to server')


     socket.emit('sendEmail',{
         to:"hasan@yahoo.com",
         text:" score for training algorithm"
     })
});


socket.on('disconnect', function(){// listening to Disconnection
    console.log('Disconnect to server') 
});


socket.on('newEmail',function (email){
    console.log("new email recieved ... " , email);
})