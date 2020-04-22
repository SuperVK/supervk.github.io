const canvas = document.getElementById('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const world = new ParticleWorld(canvas, 100, 50)

let framecount = 0
let date = 0

setInterval(() => {
    date = new Date()
    framecount++
    world.frame()    
}, 1000/60)

setInterval(() => {
    //console.log(framecount)
    framecount = 0
}, 1000)
