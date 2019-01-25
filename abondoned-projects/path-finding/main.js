let ctx, canvas, game

$(function() {
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d')
    canvas.height = 500
    canvas.width = 500
    game = new Game(5,5)
    setInterval(process, 1000/30)
    //click event for creating walls/players/goals
    $('body').on('click', (event) => {
        let mouseX = event.originalEvent.clientX
        let mouseY = event.originalEvent.clientY
        game.click(mouseX, mouseY)
    })
})

function process() {
    game.draw()
}