class Snake {
    constructor(game) {
        this.length = 3
        this.score = 0
        this.highScore = 0
        this.deaths = 0
        this.facing = 'North'
        this.plannedFacing = 'North'
        this.pos = {
            x: Math.floor(random(5, game.width-5)),
            y: Math.floor(random(5, game.height-5))
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
        this.game = game
        
    }
    move() {
        this.facing = this.plannedFacing
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
        
        if(this.game.grid[this.pos.x][this.pos.y].wall) {
            this.die()
            return
        }
        for(let x in this.game.grid) {
            for(let y in this.game.grid[x]) {
                this.game.grid[x][y].snake = false
            }
        }
        for(let i = 0; i < this.parts.length; i++) {
            let part = this.parts[i]
            if((this.parts[0].x == part.x) && (this.parts[0].y == part.y) && (i != 0)) this.die()
            this.game.grid[part.x][part.y].snake = true
        }
        return
    }
    checkDirection() {
        if(keyIsDown(UP_ARROW) && this.facing != 'South') this.plannedFacing = 'North'
        else if(keyIsDown(RIGHT_ARROW) && this.facing != 'West') this.plannedFacing = 'East'
        else if(keyIsDown(DOWN_ARROW) && this.facing != 'North') this.plannedFacing = 'South'
        else if(keyIsDown(LEFT_ARROW )&& this.facing != 'East') this.plannedFacing = 'West'
        
    }
    shiftParts(xOffset, yOffset) {
        this.pos = {
            x: this.pos.x+xOffset,
            y: this.pos.y+yOffset
        }
        if(this.pos.x == this.game.apple.x && this.pos.y == this.game.apple.y) {
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
        this.facing = 'North';
        this.plannedFacing = 'North';
        this.pos = {
            x: Math.floor(random(5, this.game.width-5)),
            y: Math.floor(random(5, this.game.height-5))
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
        for(let x in this.game.grid) {
            for(let y in this.game.grid[x]) {
                this.game.grid[x][y].snake = false
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
        this.game.resetApple()
    }

}
