class Game {
    constructor(height, width, spacingH, spacingW) {
        this.height = height;
        this.width = width;
        this.spacingH = spacingH;
        this.spacingW = spacingW;
        this.grid = this.calcGrid();
        this.snake = new Snake(this);
        this.apple = {
            x: Math.floor(random(1,width-1)),
            y: Math.floor(random(1,height-1))
        };
        this.grid[this.apple.x][this.apple.y].apple = true;
    }
    process() {
        this.snake.move();
    }
    draw() {
        stroke(50)
        this.snake.checkDirection();
        for(let x in this.grid) {
            for(let y in this.grid[x]) {
                let spot = this.grid[x][y];
                fill(0);
                rect(spot.pos.x, spot.pos.y, this.spacingW, this.spacingH);
                fill(0,255,0);
                if(`${y}`===`${this.snake.pos.y}`&&`${x}`===`${this.snake.pos.x}`) {
                    let offset = [0,0];
                     switch (this.snake.facing) {
                        case 'North': 
                            offset=[0,-1]; 
                            break;

                        case 'East': {
                            offset=[1,0];
                            break;
                        }
                        case 'South': {
                            offset=[0,1];
                            break;
                        }
                        case 'West': {
                            offset=[-1,0];
                            break;
                        }

                    }
                    noStroke();
                    ellipse(spot.pos.x + (this.spacingW/2)-(this.spacingW/2)*offset[0], spot.pos.y+(this.spacingH/2)-(this.spacingH/2)*offset[1], this.spacingW-(this.spacingH/20), this.spacingH-(this.spacingW/20));
                    stroke(50)
                }
                else if(spot.snake) rect(spot.pos.x, spot.pos.y, this.spacingW, this.spacingH);
                else if(spot.apple) {
                    fill(255, 0,0);
                    ellipse(spot.pos.x + (this.spacingW/2), spot.pos.y+(this.spacingH/2), this.spacingW, this.spacingH);
                } else if(spot.wall) {
                    fill(150);
                    rect(spot.pos.x, spot.pos.y, this.spacingW, this.spacingH);
                }
            }
        }
    }
    calcGrid() {
        let grid = [];
        for(let x = 0; x < this.width; x++) {
            grid[x] = [];
            for(let y = 0; y < this.height; y++) {
                grid[x][y] = {
                    pos: {
                        x: x*this.spacingW,
                        y: y*this.spacingH,
                    }
                }
                if(x == 0 || x == this.width-1 || y == 0 || y == this.height-1) {
                    grid[x][y] = {
                        wall: true,
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
            x: Math.floor(random(1,this.width-1)),
            y: Math.floor(random(1,this.height-1))
        }
        this.grid[this.apple.x][this.apple.y].apple = true
    }
}
