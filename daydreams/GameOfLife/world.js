class World {
    /**
     * Creates the world
     * @arg {Number|String} width the width of the canvas, can be set to auto to fill the whole canvas
     * @arg {Number|String} height the height of the canvas, can be set to auto to fill the whole canvas
     * @arg {Number} spacing the size of each block in pixels
     */
    constructor(width, height, spacing) {
        //let grid = []
        //if the width is set to auto, it will fill the whole window
        if(width == 'auto') {
            this.width = canvas.width/spacing
        } else {
            this.width = width
        }
        if(height == 'auto') {
            this.height = canvas.height/spacing
        } else {
            this.height = height
        }
        this.spacing = spacing
        this.grid = this.calcGrid()
        this.newGrid = []
        for(let x in this.grid) {
            this.newGrid[x] = []
            for(let y in this.grid[x]) {
            
                ////console.log(newGrid[x][y])
                
                this.newGrid[x][y] = this.grid[x][y]
            }

        }
    }
    frame() {
        //console.log(this.grid)
        this.tick()
        //console.log(this.grid)
        this.draw()
        //console.log(this.grid)
    }
    tick() {
        let newGrid = []
        // let newX
        // let newY
        ////console.log(this.grid)
        for(let x in this.grid) {
            newGrid[x] = []
            for(let y in this.grid[x]) {
                //newGrid[x][y] = true
                ////console.log(newGrid[x][y])
                //get all the alive neighbours
                //if(x==0||x==this.width||y==0||y==this.height) continue
                let aliveNeighbours = this.getAliveNeighbours(x,y)
                ////console.log(aliveNeighbours)
                //console.log(`${aliveNeighbours} so: `)
                if(this.grid[x][y]) {
                    //Any live cell with fewer than two live neighbors dies, as if by underpopulation
                    if(aliveNeighbours < 2) {
                        newGrid[x][y] = false
                        //continue
                        //console.log(`cell ${x}:${y} dies1`)
                    }
                    
                    //Any live cell with more than three live neighbors dies, as if by overpopulation.
                    else if(aliveNeighbours > 3) {
                        newGrid[x][y] = false
                        // continue
                        //console.log(`cell ${x}:${y} dies2`)
                    }

                    //Any live cell with two or three live neighbors lives on to the next generation.
                    
                    else {
                        newGrid[x][y] = true
                        //console.log(`cell ${x}:${y} lives on`)
                    }


                } else {
                    //Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
                    ////console.log(5)
                    if(aliveNeighbours == 3) {
                        newGrid[x][y] = true
                        //console.log(`cell ${x}:${y} becomes alive`)
                        //continue
                    } else {
                        newGrid[x][y] = false
                        //console.log(`cell ${x}:${y} stays dead`)
                    }
                }
            }
        }
        
        ////console.log(this.grid[newX][newY])
        ////console.log(newGrid)
        for(let x in this.grid) {
        
            for(let y in this.grid[x]) {
            
                ////console.log(newGrid[x][y])
                this.grid[x][y] = newGrid[x][y]
            }

        }
        //console.log(newGrid == this.grid)
        //this.grid = newGrid.slice()
    }
    getAliveNeighbours(x,y) {
        //apperntly indexes of for loops are strings........ (took me several hours)
        x = Number(x)
        y = Number(y)
        //just a bit of error handling for cells at the edge
        let aliveNeighbours = 0
        if(this.grid[x+1]) {
            if(this.grid[x+1][y]) aliveNeighbours++
            if(this.grid[x+1][y+1]) aliveNeighbours++
            if(this.grid[x+1][y-1]) aliveNeighbours++
        }
        if(this.grid[x-1]) {
            if(this.grid[x-1][y]) aliveNeighbours++
            if(this.grid[x-1][y+1]) aliveNeighbours++
            if(this.grid[x-1][y-1]) aliveNeighbours++
        }
        if(this.grid[x][y+1]) aliveNeighbours++
        if(this.grid[x][y-1])aliveNeighbours++
        
        return aliveNeighbours
    }
    draw() {
        ctx.fillStyle = '#282828'
        ctx.fillRect(0,0,canvas.width,canvas.height)
        //ctx.globalAlpha = 0.5
        ctx.fillStyle = '#15ba00'      
        //ctx.fillStyle = '#c6c6c6'
        for(let x in this.grid) {
            for(let y in this.grid[x]) {
                if(this.grid[x][y]) {
                    ctx.fillRect(x*this.spacing, y*this.spacing, this.spacing, this.spacing)
                }
            }
        }
        //console.log(this.grid)
    }
    calcGrid() {
        
        let grid = []
        for(let x = 0; x < this.width; x++) {
            grid[x] = []
            for(let y = 0; y < this.height; y++) {
                
                grid[x][y] = Math.random() > 0.6
                
            }
        }
        return grid
    }
}