var id = Math.random()

var signalhub = require('signalhub')
var hub = signalhub('snakeGame', [
  'https://signalhub-jccqtwhdwc.now.sh',
  'https://signalhub-hzbibrznqa.now.sh'
])
 
hub.subscribe('position')
  .on('data', function (message) {
    if(message.id != id){
        var updated = false
        for(var i = 0; i < otherPlayers.length; i++){
            if(otherPlayers[i].id == message.id){
                otherPlayers[i] = message
                updated = true
            }
        }
        if(!updated){
            otherPlayers.push(message)
        }
        if(message.cherry){
            cherry = message.cherry
        }   
        console.log(message, otherPlayers, updated, cherry)
    }
  })



function sendPos(){
    if(cherryUpdated){
        hub.broadcast('position', {id: id, pos: pos, cherry: cherry})
        cherryUpdated = false
    }else{
        hub.broadcast('position', {id: id, pos: pos})
    }
}

setInterval(sendPos, 100)