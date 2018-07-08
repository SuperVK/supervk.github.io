let playground;
const FRAMERATE = 60


function setup() {
    createCanvas(801,801)
    playground = new World(32,32,25,25)
    frameRate(FRAMERATE)
    setInterval(() => {
        playground.process()
    }, 1000/7)
}

function draw() {
    background(255)
    playground.draw()
    playground.snake.checkDirection()
}