let canvas, ctx

let fps = 60

let placesBeen = []

let trail = true
let pendulum = true
let trailLength = 1000
let paused = false

let G = 0.5

let pend1 = {
    massa: 50,
    length: 100,
    angle: Math.PI*0.9,
    vel: 0


}

let pend2 = {
    massa: 50,
    length: 100,
    angle: Math.PI,
    vel: 0
}

function ready() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d')
    ctx.translate(canvas.width/2, canvas.height/3)


    //settings
    G = Number(gravity.value) || 0
    gravity.onchange = () => G = Number(gravity.value) || 0
    trail = trailEl.checked
    trailEl.onchange = () => trail = trailEl.checked
    trailLength = Number(trailLengthEl.value) < 1 ? 1 : Number(trailLengthEl.value)
    trailLengthEl.onchange = () => trailLength = Number(trailLengthEl.value) < 1 ? 1 : Number(trailLengthEl.value)
    fps = Number(FPS.value) < 0 ? 1 : Number(FPS.value)
    FPS.onchange = () => fps = Number(FPS.value) < 0 ? 1 : Number(FPS.value)
    pauseEl.checked = false
    pauseEl.onchange = () => paused = pauseEl.checked


    //pend1
    pend1.length = Number(pend1length.value)
    pend1length.oninput = () => pend1.length = Number(pend1length.value) || 1
    
    pend1.length = Number(pend1massa.value)
    pend1massa.oninput = () => pend1.massa = Number(pend1massa.value) || 1

    pend1.angle = Number(pend1angle.value)
    pend1angle.oninput = () => pend1.angle = Number(pend1angle.value) || 0

    pend1.vel = Number(pend1vel.value)
    pend1vel.oninput = () => pend1.vel = Number(pend1vel.value) || 0

    frame()
}

function frame() {
    
    ctx.beginPath()

    ctx.fillStyle = '#000000'
    ctx.rect(-canvas.width/2,-canvas.height/3,canvas.width,canvas.height)
    ctx.fill()
    let x1, y1, x2, y2

    if(!paused) {
        //physics
        let num1 = -G * (2 * pend1.massa + pend2.massa) * Math.sin(pend1.angle);
        let num2 = -pend2.massa * G * Math.sin(pend1.angle-2*pend2.angle)
        let num3 = -2*Math.sin(pend1.angle-pend2.angle)*pend2.massa;
        let num4 = pend2.vel*pend2.vel*pend2.length+pend1.vel*pend1.vel*pend1.length*Math.cos(pend1.angle-pend2.angle);
        let den = pend1.length * (2*pend1.massa+pend2.massa-pend2.massa*Math.cos(2*pend1.angle-2*pend2.angle));
        pend1.vel += (num1 + num2 + num3*num4) / den;

        num1 = 2 * Math.sin(pend1.angle-pend2.angle);
        num2 = (pend1.vel*pend1.vel*pend1.length*(pend1.massa+pend2.massa));
        num3 = G * (pend1.massa + pend2.massa) * Math.cos(pend1.angle);
        num4 = pend2.vel*pend2.vel*pend2.length*pend2.massa*Math.cos(pend1.angle-pend2.angle);
        den = pend2.length * (2*pend1.massa+pend2.massa-pend2.massa*Math.cos(2*pend1.angle-2*pend2.angle));
        pend2.vel += (num1*(num2+num3+num4)) / den;

        pend1.angle += pend1.vel
        pend2.angle += pend2.vel

        pend1vel.value = Math.round(pend1.vel*1000)/1000
        pend2vel.value = Math.round(pend2.vel*1000)/1000

        pend1angle.value = Math.round(pend1.angle*1000)/1000
        pend2angle.value = Math.round(pend2.angle*1000)/1000  

        
    }
    
    //pend1
    x1 = pend1.length*Math.sin(pend1.angle)
    y1 = pend1.length*Math.cos(pend1.angle)
    
    

    //pend2

    x2 = x1+pend2.length*Math.sin(pend2.angle)
    y2 = y1+pend2.length*Math.cos(pend2.angle)

    //other
    if(trail) {
        if(!paused) {
            placesBeen.push([x2, y2])
        }
        if(placesBeen.length-trailLength > 0)
            placesBeen.splice(0,placesBeen.length-trailLength)
        
        ctx.beginPath()
        ctx.strokeStyle = '#6d6d6d'
        ctx.moveTo(placesBeen[0][0], placesBeen[0][1])
        for(let place of placesBeen) {
            ctx.lineTo(place[0], place[1])
        }

        ctx.stroke()
    }

    //lines between pendulums
    if(pendulum) {
        ctx.beginPath()
        ctx.strokeStyle = '#a8a8a8'
        ctx.lineWidth = 2
        ctx.moveTo(0,0)
        ctx.lineTo(x1,y1)
        ctx.lineTo(x2,y2)
        ctx.stroke()
        
        ctx.beginPath()
        ctx.fillStyle = '#a8a8a8'
        ctx.arc(x2,y2,10,0,2*Math.PI)
        ctx.fill()

        ctx.beginPath()
        ctx.fillStyle = '#a8a8a8'
        ctx.arc(x1,y1,10,0,2*Math.PI)
        ctx.fill()

        ctx.beginPath()
        ctx.fillStyle = '#a8a8a8'
        ctx.arc(0,0,10,0,2*Math.PI)
        ctx.fill()
    
    }
    setTimeout(frame, 1000/fps)
    

}

