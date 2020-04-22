const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')


const game = new Minesweeper(40, 40, 400)


//events
//disable right licking in canvas
canvas.addEventListener('contextmenu', event => event.preventDefault())
canvas.addEventListener('mousedown', event => {
    //left click
    if(event.buttons == 1) game.leftClick(Math.floor(event.clientX/this.spacingX), Math.floor(event.clientY/this.spacingY))
    else if(event.buttons == 2) game.rightClick(Math.floor(event.clientX/this.spacingX), Math.floor(event.clientY/this.spacingY))
    
    this.update()
})

showall.addEventListener('click', event => game.showall())
restart.addEventListener('click', event => game.genGrid())

