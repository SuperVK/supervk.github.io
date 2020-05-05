let canvas = document.getElementById('mainCanvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const mainHexagonGrid = new HexagonGrid(canvas)

function frame() {
    mainHexagonGrid.draw()
    requestAnimationFrame(frame)
}

requestAnimationFrame(frame)