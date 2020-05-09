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

        requestAnimationFrame(webglFrame)
    })


const hexagonGrid = new HexagonGrid(51)

let lastTime = 0

let totalTime = 0
let totalTimes = 0

function webglFrame(time) {
    // console.log(time-lastTime)
    totalTime+= time-lastTime
    totalTimes++
    console.log(totalTime/totalTimes)
    lastTime = time
    renderer.draw()
    requestAnimationFrame(webglFrame)
}



function context2dFrame(time) {
    // console.log(time-lastTime)
    totalTime+= time-lastTime
    totalTimes++
    // console.log(totalTime/totalTimes)
    lastTime = time
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    hexagonGrid.draw()
    requestAnimationFrame(context2dFrame)
}


function loadShaders() {
    return new Promise((resolve, reject) => {
        Promise.all([
            fetch('./shaders/circleFragment.glsl').then(res => res.text()),
            fetch('./shaders/circleVertex.glsl').then(res => res.text())
        ])
            .then((values) => {
                circleFragmentShaderSource = values[0]
                circleVertexShaderSource = values[1]
                resolve()
            })
        

    })
}