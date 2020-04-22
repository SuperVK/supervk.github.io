class Minesweeper {
    constructor(width, height, bombAmount) {
        this.width = width
        this.height = height

        //pixel
        this.spacingX = canvas.width/width
        this.spacingY = canvas.height/height
        this.bombAmount = bombAmount
        //will be a 2d array
        this.grid = []
        this.bombs = []
        this.genGrid()
        document.getElementById('bombs').innerHTML = this.bombAmount

        //events
        //disable right licking in canvas
        canvas.addEventListener('contextmenu', event => event.preventDefault())
        canvas.addEventListener('mousedown', event => {
            //left click
            if(event.buttons == 1) {
                let x = Math.floor(event.clientX/this.spacingX)
                let y = Math.floor(event.clientY/this.spacingY)
                this.uncover(x, y)
            } else if(event.buttons == 2) { //right click
                let x = Math.floor(event.clientX/this.spacingX)
                let y = Math.floor(event.clientY/this.spacingY)
                if(x >= this.width-1) return
                if(y >= this.height-1) return
                this.grid[x][y].marked = true

                document.getElementById('bombs').innerHTML = this.bombAmount-this.grid.flat().filter(g => g.marked).length
            }
            this.update()
        })

    }
    leftClick() {
        let x = Math.floor(event.clientX/this.spacingX)
        let y = Math.floor(event.clientY/this.spacingY)
        this.uncover(x, y)
        this.update()
    }
    rightClick() {
        let x = Math.floor(event.clientX/this.spacingX)
        let y = Math.floor(event.clientY/this.spacingY)
        if(x >= this.width-1) return
        if(y >= this.height-1) return
        this.grid[x][y].marked = true

        document.getElementById('bombs').innerHTML = this.bombAmount-this.grid.flat().filter(g => g.marked).length
        this.update()
    }
    showall() {
        for(let x in this.grid) {
            for(let y in this.grid[x]) {
                this.grid[x][y].discovered = true
                
            }
        }
        this.update()
    }
    uncover(x, y) {
        if(x < 0 || x > this.width-1 || y < 0 || y > this.height-1) return
        if(this.grid[x][y].discovered) return
        this.grid[x][y].discovered = true
        if(this.grid[x][y].number == 0) {
            this.uncover(x-1, y)
            this.uncover(x+1, y)
            this.uncover(x, y+1)
            this.uncover(x, y-1)
            this.uncover(x+1, y+1)
            this.uncover(x-1, y-1)
            this.uncover(x-1, y+1)
            this.uncover(x+1, y-1)
            
        }
    }
    genGrid(startx, starty) {

        //gen the places of the bombs
        while(this.bombs.length != this.bombAmount) {
            let randX = Math.floor(Math.random()*this.width)
            let randY = Math.floor(Math.random()*this.height)
            //check if there is already a bomb here
            if(this.bombs.findIndex(b => b.x == randX && b.y == randY) != -1) continue
            
            this.bombs.push({
                marked: false,
                x: randX,
                y: randY
            })
        }

        for(let x = 0; x < this.width; x++) {
            //set every column to a new array
            this.grid[x] = []
            for(let y = 0; y < this.height; y++) {
                if(this.bombs.findIndex(b => b.x == x && b.y == y) != -1) {
                    this.grid[x][y] = {
                        bomb: true,
                        discovered: false,
                        marked: false,
                        number: -1
                    }
                } else {
                    let num = this.bombs.filter(b => b.x >= x-1 && b.x <= x+1 && b.y >= y-1 && b.y <= y+1).length
                    
                    this.grid[x][y] = {
                        bomb: false,
                        discovered: false,
                        marked: false,
                        number: num
                    }
                }
            }
        }
        this.update()

    }
    //update the game visually
    update() {
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        for(let x in this.grid) {
            for(let y in this.grid[x]) {
                ctx.beginPath()
                ctx.strokeStyle = '#565656'
                ctx.lineWidth = this.spacingX/25
                //choose the color of the block
                if(this.grid[x][y].discovered) {
                    ctx.fillStyle = 'white'
                } else if(this.grid[x][y].marked) {
                    ctx.fillStyle = 'yellow'
                } else {
                    ctx.fillStyle = 'black'
                }
                ctx.rect(this.spacingX*x, this.spacingY*y, this.spacingX, this.spacingY)
                ctx.fill()
                ctx.stroke()

                //draw the numbers
                if(this.grid[x][y].discovered) {
                    if(this.grid[x][y].bomb) {
                        ctx.fillStyle = 'red'
                        ctx.fillRect(this.spacingX*x, this.spacingY*y, this.spacingX, this.spacingY)
                    }
                    if(this.grid[x][y].number > 0) {
                        ctx.fillStyle = 'green'
                        ctx.font = `${this.spacingX/2}px sans-serif`
                        let width = ctx.measureText(this.grid[x][y].number).width
                        ctx.fillText(this.grid[x][y].number, this.spacingX*x+this.spacingX/2-width/2, this.spacingY*y+this.spacingY/2+this.spacingX/5)
                    }
                }
            }
        }
    }

}