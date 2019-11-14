//max pos x:32, y:32
var pos = [{x: 5,y: 5, direction: 0}];
var state = 0
var cherry = {
  x: 22,
  y: 15
}
var prevDir = 0
var gameOver = false

var otherPlayers = []

function setup() {
  createCanvas(660,660)

  frameRate(30); 
}

function draw() {
  if(!gameOver){
    clear()
    background('yellow')
    //draw snake
    for (var i = 0; i < pos.length; i++) {
      fill('red')
      rect(pos[i].x * 20, pos[i].y * 20, 20, 20)
    }

    //draw other players
    for (var i = 0; i < otherPlayers.length; i++) {
      for(var j = 0; j < otherPlayers[i].pos.length; j++){
        fill('green')
        rect(otherPlayers[i].pos[j].x * 20, otherPlayers[i].pos[j].y * 20, 20, 20)
      }
    }


    if (state % 5 == 0) {
      //move all nodes in snake to the position of the next
      for (var i = 0; i < pos.length - 1; i++) {
        pos[i].x = pos[i + 1].x
        pos[i].y = pos[i + 1].y
        pos[i]. direction = pos[i + 1].direction
      }
      prevDir = pos[pos.length-1].direction

      //move head forward
      if (pos[pos.length - 1].direction == 0) {
        pos[pos.length - 1].x += 1
      } else if (pos[pos.length - 1].direction == 1) {
        pos[pos.length - 1].y += 1
      } else if (pos[pos.length - 1].direction == 2) {
        pos[pos.length - 1].x -= 1
      } else if (pos[pos.length - 1].direction == 3) {
        pos[pos.length - 1].y -= 1
      }
    }

    //check collision with cherry
    if (cherry.x === pos[pos.length - 1].x && cherry.y === pos[pos.length - 1].y) {
      cherry.x = Math.floor(random(31)) + 1
      cherry.y = Math.floor(random(31)) + 1

      //add node to snake
      if (pos[0].direction == 0) {
        pos.unshift({
        x: pos[0].x - 1,
        y: pos[0].y
      })
      } else if (pos[0].direction == 1) {
        pos.unshift({
        x: pos[0].x,
        y: pos[0].y-1
      })
      } else if (pos[0].direction == 2) {
        pos.unshift({
        x: pos[0].x + 1,
        y: pos[0].y
      })
      } else if (pos[0].direction == 3) {
        pos.unshift({
        x: pos[0].x,
        y: pos[0].y+1
      })
      }
      
    }

    //draw cherry
    fill('blue')
    rect(cherry.x * 20, cherry.y * 20, 20, 20)
     
    //detect keypress and change direction
    if (keyIsDown(RIGHT_ARROW)) {
        if(prevDir !== 2){
      pos[pos.length-1].direction = 0;
        }
    } else if (keyIsDown(DOWN_ARROW)) {
        if(prevDir !== 3){
      pos[pos.length-1].direction = 1;
        }
    } else if (keyIsDown(LEFT_ARROW)) {
        if(prevDir !== 0){
      pos[pos.length-1].direction = 2;
        }
    } else if (keyIsDown(UP_ARROW)) {
        if(prevDir !== 1){
      pos[pos.length-1].direction = 3;
        }
    }
    
    state++

    //detect collision with self
    for(var i = 0; i < pos.length; i++){
      for(var j = 0; j < pos.length; j++){
        if(i != j){
          if(pos[i].x === pos[j].x&&pos[i].y === pos[j].y){
            gameOver = true
            console.log(pos)
            console.log(i + " " + j)
          }
        }
      }
    }

    //detect collision with wall
    if(pos[pos.length-1].x > 32||pos[pos.length-1].x < 0||pos[pos.length-1].y > 32||pos[pos.length-1].y < 0){
      gameOver = true
    }
  }

  //draw score
  text("        You: " + pos.length, 100,100)
  for(var i = 0; i < otherPlayers.length; i++){
    text("Other Player: " + otherPlayers[i].pos.length, 80,(100)+ (i+1)*20)
  }
}