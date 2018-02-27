
var socket = io();

socket.on('connect', function(){ // listening to connection
    console.log('connect to server')
    
    
    socket.emit('createMessage', {
        from:'Andrew',
        text:'Yup, that works for me'
    })
});


socket.on('disconnect', function(){// listening to Disconnection
    console.log('Disconnect to server') 
});



socket.on('newMessage', function(message) {
    console.log('newMesage:',message);
})

