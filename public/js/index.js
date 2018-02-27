
var socket = io();

socket.on('connect', function(){ // listening to connection
    console.log('connect to server')

});


socket.on('disconnect', function(){// listening to Disconnection
    console.log('Disconnect to server') 
});



socket.on('newMessage', function(message) {
    console.log('newMesage:',message);
    $("#messageList .messageListUL")
    .append('<li><span class="tab">'+message.from +'>>'+ message.text +'</span></li>');

})

jQuery("#sendingForm").submit(function(e){
    e.preventDefault();
    console.log(  $( "#sendingForm #formMsg" ).val()     );

    socket.emit('createMesage', {from:'user',text :$( "#sendingForm #formMsg" ).val()}  )
});