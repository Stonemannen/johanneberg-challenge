var id = Math.random()

var signalhub = require('signalhub')
var hub = signalhub('my-app-name', [
  'localhost:8080'
])
 
hub.subscribe('my-channel')
  .on('data', function (message) {
    console.log(message)
    if(message.id != id){
        otherPlayer = message.pos
        if(message.cherry){
            cherry = message.cherry
        }   
    }
  })
 
hub.broadcast('my-channel', {hello: 'world'})

console.log("sent")


function sendPos(){
    console.log(cherry);
    
    hub.broadcast('my-channel', {id: id, pos: pos, cherry: cherry})
}

setInterval(sendPos, 150)