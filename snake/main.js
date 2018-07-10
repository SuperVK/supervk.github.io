let world;
const FRAMERATE = 60


function setup() {
    createCanvas(801,801)
    world = new Game(32,32,25,25)
    frameRate(FRAMERATE)
    setInterval(() => {
        world.process()
    }, 1000/10)
}

function draw() {
    background(255)
    world.draw()
}