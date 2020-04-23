const GRAVITY = 2.5
let POPULATION = 100
const INPUTS = 1
const OUTPUTS = 1
const HIDDEN_LAYERS = 1
let speed
let players = [], alivePlayers = [], obstacles, framecount

function setup() {
    speed = 7.5
    createCanvas(1200, 800)
    frameRate(60)
    for(let i = 0; i < POPULATION; i++) {
        players.push(new Player())
        
    }
    alivePlayers = players
    obstacles = []
    obstacles.push(new Obstacle())
    
    framecount = 0
}

function draw() {
    train = !document.getElementById('checkbox').checked
    if(!train) POPULATION = 1
    else POPULATION = 100
    if(alivePlayers.length == 0) {
        resetGame()
    }
    framecount++
    speed = 7.5
    background(69, 204, 249)
    noStroke()
    fill(49, 178, 94)
    rect(0, 600, 1200, 800)
    for(let i = 0; i < obstacles.length; i++){
        if(obstacles[i].x < 1200/2 && !obstacles[i].actived) {
            obstacles[i].actived = true
            obstacles.push(new Obstacle(Math.floor(Math.random() * 100) - 100))
        }
        if(obstacles[i].x < -obstacles[i].width) {
            obstacles.splice(i, 1)
            players[i].score++
            continue
        }
        obstacles[i].move()
        obstacles[i].display()
    }
    for(let i in players){
        if(players[i].death) {
            alivePlayers.splice(i, 1)
            continue
        }
        players[i].calcDisplay()
        players[i].display()
        
        
    }
    
}

function keyPressed() {
    if(keyCode == 32 && !train) {
        players[0].jump()
    }
}