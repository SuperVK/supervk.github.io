class Game {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.grid = this.makeGrid()
    }
    makeGrid() {
        let grid = []
        for(let x = 0; x < 100; x++) {
            grid[x] = []
            for(let y = 0; y < 100; y++) {
                grid[x][y] = {
                    isWall: Math.random() < 0.3
                }
            }
        }
        return grid
    }
    draw() {
        // ctx.fillStyle = '#505050'
        // ctx.fillRect(0,0,width*100,height*100)
        // ctx.fill()
        for(let x in this.grid) {
            for(let y in this.grid[x]) {
                if(this.grid[x][y].isWall) {
                    ctx.fillStyle = '#000000'
                    ctx.fillRect(this.width*x, this.height*y, (this.width+1)*x, (this.height+1)*y)
                    ctx.fill()
                } else {
                    ctx.fillStyle = '#eeeeee'
                    ctx.fillRect(this.width*x, this.height*y, (this.width+1)*x, (this.height+1)*y)
                    ctx.fill()
                }
            }
        }
    }
    getPath() {
        console.log('Clicked!')
    }
    clearGrid() {
        for(let x in this.grid) {
            for(let y in this.grid[x]) {
                this.grid[x][y].isWall = false
            }
        }
    }
    ranGrid() {
        for(let x in this.grid) {
            for(let y in this.grid[x]) {
                this.grid[x][y].isWall = Math.random() < 0.3
            }
        }
    }
    click(mouseX, mouseY) {
        

    }
}