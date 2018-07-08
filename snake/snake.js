class Snake {
    constructor(world) {
        this.length = 3
        this.score = 0
        this.highScore = 0
        this.deaths = 0
        this.facing = 'North'
        this.pos = {
            x: Math.floor(random(5, world.width-5)),
            y: Math.floor(random(5, world.height-5))
        }
        this.parts = [{
                x: this.pos.x,
                y: this.pos.y
            },
            {
                x: this.pos.x,
                y: this.pos.y+1
            },
            {
                x: this.pos.x,
                y: this.pos.y+2
            }
        ]
        this.world = world
        
    }
    move() {
        switch (this.facing) {
            case 'North': {
                this.shiftParts(0,-1)
                break;
            }
            case 'East': {
                this.shiftParts(1,0)
                break;
            }
            case 'South': {
                this.shiftParts(0,1)
                break;
            }
            case 'West': {
                this.shiftParts(-1,0)
                break;
            }
            
        }
        
        if(this.world.grid[this.pos.x] == undefined) {
            this.die()
            return
        } else if(this.world.grid[this.pos.x][this.pos.y] == undefined) {
            this.die()
            return
        }
        for(let x in this.world.grid) {
            for(let y in this.world.grid[x]) {
                this.world.grid[x][y].snake = false
            }
        }
        for(let i = 0; i < this.parts.length; i++) {
            let part = this.parts[i]
            if((this.parts[0].x == part.x) && (this.parts[0].y == part.y) && (i != 0)) this.die()
            this.world.grid[part.x][part.y].snake = true
        }
        return
    }
    checkDirection() {
        if(keyIsDown(UP_ARROW) && this.facing != 'South') this.facing = 'North'
        else if(keyIsDown(RIGHT_ARROW) && this.facing != 'West') this.facing = 'East'
        else if(keyIsDown(DOWN_ARROW) && this.facing != 'North') this.facing = 'South'
        else if(keyIsDown(LEFT_ARROW )&& this.facing != 'East') this.facing = 'West'
        
    }
    shiftParts(xOffset, yOffset) {
        this.pos = {
            x: this.pos.x+xOffset,
            y: this.pos.y+yOffset
        }
        if(this.pos.x == this.world.apple.x && this.pos.y == this.world.apple.y) {
            this.appleCollect()
        } else {
            this.parts.splice(this.parts.length-1, 1);
        }
        
        let firstEl = [this.pos]
        this.parts = firstEl.concat(this.parts)
        
    }
    die() {
        this.deaths++
        this.length = 3
        this.score = 0
        this.facing = 'North'
        this.pos = {
            x: Math.floor(random(5, this.world.width-5)),
            y: Math.floor(random(5, this.world.height-5))
        }
        this.parts = [{
                x: this.pos.x,
                y: this.pos.y
            },
            {
                x: this.pos.x,
                y: this.pos.y+1
            },
            {
                x: this.pos.x,
                y: this.pos.y+2
            }
        ]
        for(let x in this.world.grid) {
            for(let y in this.world.grid[x]) {
                this.world.grid[x][y].snake = false
            }
        }
        document.getElementById('score').innerHTML = 'Score: '+ this.score
        document.getElementById('deaths').innerHTML = 'Deaths: '+ this.deaths
    }
    appleCollect() {
        this.score++
        document.getElementById('score').innerHTML = 'Score: '+ this.score
        if(this.score > this.highScore) {
            this.highScore = this.score
            document.getElementById('highScore').innerHTML = 'High score: '+ this.highScore
        }
        this.world.resetApple()
    }

}