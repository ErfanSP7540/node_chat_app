
var socket = io();

socket.on('connect', function(){ // listening to connection
    console.log('connect to server')
    
    // write below code from console
    // socket.emit('createMessage', {
    //     from:'Andrew',
    //     text:'Yup, that works for me'
    // })


    socket.emit(
        'sendMsgCallback',
        { text:'this is a message'},
        function(backData){
            console.log(backData);
        })
});


socket.on('disconnect', function(){// listening to Disconnection
    console.log('Disconnect to server') 
});



socket.on('newMessage', function(message) {
    console.log('newMesage:',message);
})


socket.on('AdminMessage', function(message) {
    console.log('newMesage:',message);
})