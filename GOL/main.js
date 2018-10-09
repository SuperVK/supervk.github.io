
let canvas;
let ctx;
let world

function ready() {
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d')
    world = new World(50, 50, 25)
    setInterval(process, 1000/60)
}

function process() {
    world.draw()
}