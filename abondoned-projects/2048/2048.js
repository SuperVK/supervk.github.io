class Game2048 {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.grid = this.loadGrid()
        
        this.draw()
    }
    loadGrid() {
        let grid = []
        for(let x = 1; x <= this.width; x++) {
            grid[x] = []
            for(let y = 1; y <= this.width; y++) {
                grid[x][y] = 0
                $('#grid-container').append(`<div id="${x}-${y}" class="grid-item">0</div>`)
            }
        }
        return grid
    }
    draw() {
        for(let x in this.grid) {
            for(let y in this.grid[x]) {
                $(`#${x}-${y}`).html(this.grid[x][y])
            }
        }
    }
    move(direction) {
        switch (direction) {
            case('north'): {
                
                for(let x in this.grid) {
                    let smooshedTogether = []
                    for(let y in this.grid[x]) {
                        if(this.grid[x][y] != 0) smooshedTogether.push(this.grid[x][y])
                    }
                    this.grid[x] = []
                    for(let i in smooshedTogether) {
                        if(smooshedTogether[i+1] == smooshedTogether[i]) {
                            smooshedTogether[i] = smooshedTogether[i]*2
                            smooshedTogether.slice(i+1)
                        } 
                        if(i <= this.width && smooshedTogether[i] == undefined) smooshedTogether = 0

                    }
                    this.grid[x] = smooshedTogether
                }
                break;
            }
        
            
        }
        this.grid[Math.ceil(Math.random()*this.width)][Math.ceil(Math.random()*this.height)] = 2
        this.draw()
    }
}