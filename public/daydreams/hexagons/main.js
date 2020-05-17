const CONFIG = {
    depth: false,
    colorRange: 1,
    colorOffset: 0,
    speed: 0.003,
    size: 2
}


const canvas = document.getElementById('2dCanvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
//const ctx = canvas.getContext('2d')
// ctx.miterLimit = -1

const gl = canvas.getContext('webgl', {
    antialias: false
})


const hexagonGrid = new HexagonGrid(100)

let lastTime = 0

let totalTime = 0
let totalTimes = 0

function webglFrame(time) {
    //console.log(1000/(time-lastTime))
    totalTime+= time-lastTime
    totalTimes++
    //console.log(totalTime/totalTimes)
    lastTime = time
    hexagonGrid.recalculateHeights()
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
    hexagonGrid.recalculateHeights()
    hexagonGrid.draw()
    requestAnimationFrame(context2dFrame)
}

let circleFragmentShaderSource = document.getElementById('circleFragment').innerText
let circleVertexShaderSource = document.getElementById('circleVertex').innerText
let lineFragmentShaderSource = document.getElementById('lineFragment').innerText
let lineVertexShaderSource = document.getElementById('lineVertex').innerText

let renderer = new Renderer()

requestAnimationFrame(webglFrame)



window.wallpaperPropertyListener = {
    applyGeneralProperties: function(properties) {
        if(properties.color_range) CONFIG.colorRange = properties.color_range.value
        if(properties.color_offset) CONFIG.colorOffset = properties.color_offset.value
        if(properties.speed) CONFIG.speed = properties.speed.value
        if(properties.depth) CONFIG.depth = properties.depth.value
        if(properties.size) CONFIG.size = properties.size.value


        if(properties.line_length) {
            hexagonGrid = new HexagonGrid(properties.line_length.value)
        }
        
    }
};