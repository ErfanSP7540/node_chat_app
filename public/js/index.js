
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

jQuery("#Geolocation").on('click',function(){
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(
            function(position){
                console.log(position);
                socket.emit('createGeolocation',{   from:'user',
                                                    latitude:position.coords.latitude,
                                                    longitude:position.coords.longitude})
            },function(){
                console.log('unable to fetch location');

            }) 
    } else 
    {
        console.log("Geolocation is not supported by this browser.");
    }
})
