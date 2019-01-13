const SPEED = 25
let engine;
let canvas;
let ctx;
let framecount = 0 
let log = false
let modes = ['orthographic', 'perspective']
let modeIndex = 0
let keysDown = {}
let mousemoves = {
    x: 0,
    y: 0
}

document.onreadystatechange = function() {
    if(document.readyState == 'loading' || document.readyState == 'interactive') return
    canvas = document.getElementById('canvas')
    canvas.height = window.innerHeight-20
    canvas.width = window.innerWidth-20
    ctx = canvas.getContext('2d')
    ctx.translate(canvas.width/2, canvas.height/2)
    ctx.miterLimit = 1
    engine = new Engine3D()
    
    canvas.addEventListener('click', function(e) {
        canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;

        canvas.requestPointerLock()
    })

    document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

    window.addEventListener("keydown", (e) => keysDown[e.keyCode] = true)
    window.addEventListener("keyup", (e) => keysDown[e.keyCode] = false)

    document.addEventListener('pointerlockchange', lockChangeAlert, false);
    document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

    
    document.onkeypress = function(event) {
        switch(event.key.toUpperCase()) {
            case 'ESCAPE': {
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

    setInterval(frame, 1000/30)
}

function frame() {
    framecount++
    if(!engine.isPaused) {
        engine.wipe()
        engine.render()
        engine.move()
    }
}

function updatePosition(e) {
    mousemoves.x += e.movementX
    mousemoves.y += e.movementY
}

function lockChangeAlert() {
    if (document.pointerLockElement === canvas || document.mozPointerLockElement === canvas) {
        console.log('The pointer lock status is now locked');
        document.addEventListener("mousemove", updatePosition, false);
    } else {
        console.log('The pointer lock status is now unlocked');  
        document.removeEventListener("mousemove", updatePosition, false);
    }
}




