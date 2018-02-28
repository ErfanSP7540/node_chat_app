
function scrollToButton() {
    console.log('scrollToButton..');

    var clientHeight = $("#messages").prop('clientHeight')
    var scrollHeight = $("#messages").prop('scrollHeight')
    var scrollTop    = $("#messages").prop('scrollTop')
    $("#messages").scrollTop(scrollHeight-clientHeight)
    console.log(scrollHeight-clientHeight); 
}


var socket = io();
socket.on('connect', function(){ // listening to connection
    console.log('connect to server')

    var params = jQuery.deparam(location.search)
    socket.emit('join',params,function(e){
        if(e){
            alert('Invalid name and room name ... ');
            window.location.href="/"
        }
    })


});


socket.on('disconnect', function(){// listening to Disconnection
    console.log('Disconnect to server') 
});

socket.on('newMessage', function(message) {
    console.log('newMesage:',message);

    var template = $('#message_template').html();
    Mustache.parse(template);   // optional, speeds up future uses
    var rendered = Mustache.render(template, {
                                                from:message.from,
                                                text:message.text,
                                                createAt:moment(message.createAt).format('LT')
                                            });
    $('#messages.chat__messages').append(rendered);

    scrollToButton();
})


socket.on('geoLocationMessage', function(message) {

    var template = $('#location_message_template').html();
    Mustache.parse(template);   // optional, speeds up future uses
    var rendered = Mustache.render(template, {
                                                from:message.from,
                                                url:message.url,
                                                createAt:moment(message.createAt).format('LT')
                                            });
    $('#messages.chat__messages').append(rendered);
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
