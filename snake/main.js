let playground;
const FRAMERATE = 10


function setup() {
    createCanvas(801,801)
    playground = new World(32,32,25,25)
    frameRate(FRAMERATE)
}

function draw() {
    background(255)
    playground.draw()
}