const canvas = document.getElementById('2dCanvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
// const ctx = canvas.getContext('2d')
// ctx.miterLimit = -1

const gl = canvas.getContext('webgl')

let vertexShaderSource
let fragmentShaderSource

let renderer 
loadShaders()
    .then(() =>{
        renderer = new Renderer()
    })


const hexagonGrid = new HexagonGrid(50)

function context2dFrame() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    hexagonGrid.draw()
}

function loadShaders() {
    return new Promise((resolve, reject) => {
        Promise.all([
            fetch('./shaders/fragment.glsl').then(res => res.text()),
            fetch('./shaders/vertex.glsl').then(res => res.text())
        ])
            .then((values) => {
                fragmentShaderSource = values[0]
                vertexShaderSource = values[1]
                resolve()
            })
        

    })
}