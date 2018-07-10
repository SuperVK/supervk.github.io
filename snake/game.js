class Game {
    constructor(height, width, spacingH, spacingW) {
        this.height = height
        this.width = width
        this.spacingH = spacingH
        this.spacingW = spacingW
        this.grid = this.calcGrid()
        this.snake = new Snake(this)
        this.apple = {
            x: Math.floor(random(1,width-1)),
            y: Math.floor(random(1,height-1))
        }
        this.grid[this.apple.x][this.apple.y].apple = true
    }
    process() {
        
        this.snake.move()

    }
    draw() {
        stroke(50)
        this.snake.checkDirection()
        for(let x in this.grid) {
            for(let y in this.grid[x]) {
                let spot = this.grid[x][y]
                if(spot.snake) {
                    fill(0,255,0)
                } else if(spot.apple) {
                    fill(255, 0,0)
                } else if(spot.wall) {
                    fill(150)
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
                if(x == 0 || x == 31 || y == 0 || y == 31) {
                    grid[x][y] = {
                        snake: false,
                        apple: false,
                        wall: true,
                        pos: {
                            x: x*this.spacingW,
                            y: y*this.spacingH,
                        }
                    }
                } else {
                    grid[x][y] = {
                        snake: false,
                        apple: false,
                        wall: false,
                        pos: {
                            x: x*this.spacingW,
                            y: y*this.spacingH,
                        }
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
        if(this.grid[this.apple.x][this.apple.y].wall) this.resetApple()
        this.grid[this.apple.x][this.apple.y].apple = true
    }
}