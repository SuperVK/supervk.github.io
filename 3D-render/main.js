let engine;
let canvas;
let ctx;
let framecount = 0 
let log = false
let modes = ['orthographic', 'perspective']
let modeIndex = 0
let keysDown = {}
let mouseDown = []
document.onreadystatechange = function() {
    if(document.readyState == 'loading' || document.readyState == 'interactive') return
    canvas = document.getElementById('canvas')
    canvas.height = window.innerHeight-20
    canvas.width = window.innerWidth-20
    ctx = canvas.getContext('2d')
    ctx.translate(canvas.width/2, canvas.height/2)
    engine = new Engine3D()

    setInterval(() => {
        framecount++
        if(!engine.isPaused) {
            // engine.objects[0].rotate(0.008, 'y')
            // engine.objects[0].rotate(0.008, 'z')
            // engine.objects[0].rotate(0.008, 'x')
            // engine.objects[1].rotate(-0.008, 'y')
            // engine.objects[1].rotate(-0.008, 'z')
            // engine.objects[1].rotate(-0.008, 'x')
            engine.wipe()
            engine.render()
            engine.move()
        }
        
    }, 1000/30)
}

document.onkeypress = function(event) {
    switch(event.key.toUpperCase()) {
        case ' ': {
            if(engine.isPaused) engine.isPaused = false
            else engine.isPaused = true
            break
        }
        case 'L': {
            log = true
            break
        }
        case 'M': {
            modeIndex++
            if(modeIndex == modes.length) modeIndex = 0
            engine.mode = modes[modeIndex]
            break
        }
    }
}

document.addEventListener("keydown", (e) => keysDown[e.keyCode] = true)
document.addEventListener("keyup", (e) => keysDown[e.keyCode] = false
)


window.onmousedown = function(e) {
    mouseDown = [true, e.clientX, e.clientY]
}
window.onmouseup = function(e) {
    mouseDown = [false, e.clientX, e.clientY]
}
