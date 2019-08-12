const canvas = document.getElementById('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const world = new ParticleWorld(canvas, 200)

setInterval(() => {
    world.frame()
}, 1000/60)
