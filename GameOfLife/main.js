
let canvas;
let ctx;
let world
let interval

function ready() {
    console.log('beans')
    canvas = document.getElementById('canvas')
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
    ctx = canvas.getContext('2d')
    
    world = new World('auto', 'auto', 10)
    world.draw()
    interval = setInterval(process, 1000/10)
}

function process() {
    world.frame()
    
}