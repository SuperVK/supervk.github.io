class World {
    constructor(width, height, spacing) {
        let grid = []
        this.width = width
        this.height = height
        this.spacing = spacing
        this.grid = this.calcGrid()
    }
    draw() {
        ctx.strokeStyle = '#4c4c4c'
        for(let x in this.grid) {
            for(let y in this.grid[x]) {
                ctx.strokeRect(this.grid[x][y].pos.x, this.grid[x][y].pos.y, this.spacing, this.spacing)
            }
        }
    }
    calcGrid() {
        
        let grid = []
        for(let x = 0; x < this.width; x++) {
            grid[x] = []
            for(let y = 0; y < this.height; y++) {
                
                grid[x][y] = {
                    isAlive: false,
                    pos: {
                        x: x*this.spacing,
                        y: y*this.spacing,
                    }
                }
               
            }
        }
        return grid
    }
}