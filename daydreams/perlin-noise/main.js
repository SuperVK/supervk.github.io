const canvas = document.getElementById('masterCanvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let terrain = new Terrain(Date.now(), canvas.width, canvas.height, ctx)

document.addEventListener('keydown', (event) => {
    if(event.key == 'ArrowRight') terrain.time += 0.01
    else if(event.key == 'ArrowLeft') terrain.time -= 0.01
    if(event.key == 'ArrowUp') terrain.waterLevel += 0.01
    else if(event.key == 'ArrowDown') terrain.waterLevel -= 0.01
    if(terrain.waterLevel > 1) terrain.waterLevel = 1
    else if(terrain.waterLevel < 0) terrain.waterLevel = 0
})

document.addEventListener('wheel', (event) => {
    terrain.zoom += event.deltaY/100
})

function frame() {
    terrain.drawFrame()
    requestAnimationFrame(frame)
}

requestAnimationFrame(frame)

