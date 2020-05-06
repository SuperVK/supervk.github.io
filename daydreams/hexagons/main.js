const canvas = document.getElementById('2dCanvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')
ctx.miterLimit = -1

const hexagonGrid = new HexagonGrid(50)

function frame() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    hexagonGrid.draw()

}

requestAnimationFrame(frame)