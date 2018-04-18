const GRAVITY = 2.5
let speed
let player, obstacles, framecount

function setup() {
    speed = 7.5
    createCanvas(1200, 800)
    frameRate(60)
    player = new Player()
    obstacles = []
    obstacles.push(new Obstacle())
    setTimeout(function() {
        obstacles.push(new Obstacle())
    }, 10000/speed)
    
    framecount = 0
}

function draw() {
    framecount++
    speed = 7.5
    background(69, 204, 249)
    noStroke()
    fill(49, 178, 94)
    rect(0, 600, 1200, 800)
    player.calcDisplay()
    player.display()
    
    for(let i = 0; i < obstacles.length; i++){
        if(obstacles[i].x < -obstacles[i].width) {
            obstacles.splice(i, 1)
            obstacles.push(new Obstacle(Math.floor(Math.random() * 200) - 100))
            player.score++
            continue
        }
        obstacles[i].move()
        obstacles[i].display()
    }
}

function keyPressed() {
    if(keyCode == 32) {
        player.jump()
    }
}