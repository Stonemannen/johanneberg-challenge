  //max pos x:32, y:32
  var pos = [{x: 5,y: 5}];
  var direction = 0
  var state = 0
  var cherry = {
    x: 15,
    y: 22
  }
  var prevDir = 0
  var gameOver = false

function setup() {
  createCanvas(660,660)
}

function draw() {
  if(!gameOver){
    clear()
    background('yellow')
    for (var i = 0; i < pos.length; i++) {
      fill('red')
      rect(pos[i].x * 20, pos[i].y * 20, 20, 20)
    }
      if (state % 5 == 0) {
      for (var i = 0; i < pos.length - 1; i++) {
        pos[i].x = pos[i + 1].x
        pos[i].y = pos[i + 1].y
      }
        prevDir = direction
    }
    if (state % 5 == 0) {
      if (direction == 0) {
        pos[pos.length - 1].x += 1
      } else if (direction == 1) {
        pos[pos.length - 1].y += 1
      } else if (direction == 2) {
        pos[pos.length - 1].x -= 1
      } else if (direction == 3) {
        pos[pos.length - 1].y -= 1
      }
    }
    if (cherry.x === pos[pos.length - 1].x && cherry.y === pos[pos.length - 1].y) {
      cherry.x = Math.floor(random(31)) + 1
      cherry.y = Math.floor(random(31)) + 1
          if (direction == 0) {
        pos.unshift({
        x: pos[0].x - 1,
        y: pos[0].y
      })
      } else if (direction == 1) {
        pos.unshift({
        x: pos[0].x,
        y: pos[0].y-1
      })
      } else if (direction == 2) {
        pos.unshift({
        x: pos[0].x + 1,
        y: pos[0].y
      })
      } else if (direction == 3) {
        pos.unshift({
        x: pos[0].x,
        y: pos[0].y+1
      })
      }
      
    }

    fill('blue')
    rect(cherry.x * 20, cherry.y * 20, 20, 20)
    console.log(cherry)
      
    if (keyIsDown(RIGHT_ARROW)) {
        if(prevDir !== 2){
      direction = 0;
        }
    } else if (keyIsDown(DOWN_ARROW)) {
        if(prevDir !== 3){
      direction = 1;
        }
    } else if (keyIsDown(LEFT_ARROW)) {
        if(prevDir !== 0){
      direction = 2;
        }
    } else if (keyIsDown(UP_ARROW)) {
        if(prevDir !== 1){
      direction = 3;
        }
    }
    
    state++
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
    if(pos[pos.length-1].x > 32||pos[pos.length-1].x < 0||pos[pos.length-1].y > 32||pos[pos.length-1].y < 0){
          gameOver = true
        }
    }
    }
    text(pos.length, 100,100)
}