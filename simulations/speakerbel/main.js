const I0 = 1e-12

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')


const disco = new Disco(40, 40, 400)


//events
//disable right licking in canvas
canvas.addEventListener('contextmenu', event => event.preventDefault())
canvas.addEventListener('mousedown', event => {
    //left click
    if(event.buttons == 1) disco.leftClick(Math.floor(event.clientX/disco.spacingX), Math.floor(event.clientY/disco.spacingY))
    else if(event.buttons == 2) disco.rightClick(Math.floor(event.clientX/disco.spacingX), Math.floor(event.clientY/disco.spacingY))
    
})


