
var socket = io();

socket.on('connect', function(){ // listening to connection
    console.log('connect to server')

});


socket.on('disconnect', function(){// listening to Disconnection
    console.log('Disconnect to server') 
});

socket.on('newMessage', function(message) {
    console.log('newMesage:',message);
    $("#messages.chat__messages")
    .append('<li><span class="tab">'+message.from +'>>'+ message.text +'</span></li>');
})


socket.on('geoLocationMessage', function(message) {
    console.log('geoLocationMessage:',message);
     $("#messages.chat__messages")
     .append('<li><span class="tab">'+ message.from +'>>  <a href="https://www.google.com/maps/?q='+ message.latitude+','+message.longitude+'" target="_blank">my Locaion </a></span></li>');
})

jQuery("#message-form").submit(function(e){
    e.preventDefault();
    if($( "#message-form #formMsg" ).val()==""){return}
    console.log(  $( "#message-form #formMsg" ).val()     );
    
    socket.emit( 'createMesage',
                 {from:'user',text :$( "#message-form #formMsg" ).val()},
                 function(acceptedOutput){
                    if(acceptedOutput){  $( "#message-form #formMsg" ).val(""); }
                })
});

jQuery("#send-location").on('click',function(){
    jQuery("#send-location").attr("disabled", "disabled").text('Send Location...')

    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(
            function(position){
                console.log(position);
                socket.emit('createGeolocation',{   from:'user',
                                                    latitude:position.coords.latitude,
                                                    longitude:position.coords.longitude},
                                                    function(){ jQuery("#send-location").attr("disabled", false).text('Send Location')  } )
            },function(){
                //console.log('unable to fetch location');
                socket.emit('createGeolocation',{   from:'user',
                                                    latitude:34.089014,
                                                    longitude:49.702003},
                                                    function(){ jQuery("#send-location").attr("disabled", false).text('Send Location')  }
                                                )

            }) 
    } else 
    {
        console.log("Geolocation is not supported by this browser.");
    }
})
