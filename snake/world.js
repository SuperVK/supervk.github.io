class World {
    constructor(height, width, spacingH, spacingW) {
        this.height = height
        this.width = width
        this.spacingH = spacingH
        this.spacingW = spacingW
        this.grid = this.calcGrid()
        this.snake = new Snake(this)
        this.apple = {
            x: Math.floor(random(0,width)),
            y: Math.floor(random(0,height))
        }
        this.grid[this.apple.x][this.apple.y].apple = true
    }
    draw() {
        
        this.snake.move()
        stroke(0)
        
        for(let x in this.grid) {
            for(let y in this.grid[x]) {
                let spot = this.grid[x][y]
                if(spot.snake) {
                    fill(0,255,0)
                } else if(spot.apple) {
                    fill(255, 0,0)
                } else {
                    fill(0)
                }
                rect(spot.pos.x, spot.pos.y, this.spacingW, this.spacingH) 
            }
        }
    }
    calcGrid() {
        
        let grid = []
        for(let x = 0; x < this.width; x++) {
            grid[x] = []
            for(let y = 0; y < this.height; y++) {
                grid[x][y] = {
                    snake: false,
                    apple: false,
                    pos: {
                        x: x*this.spacingW,
                        y: y*this.spacingH,
                    }
                }
            }
        }
        return grid
    }
    resetApple() {
        this.grid[this.apple.x][this.apple.y].apple = false
        this.apple = {
            x: Math.floor(random(0,this.width)),
            y: Math.floor(random(0,this.height))
        }
        this.grid[this.apple.x][this.apple.y].apple = true
    }
}