class Player {
    constructor() {
        this.width = 100
        this.height = 100
        this.x = 5
        this.y= 600-this.height
        this.score = 0
        this.isJumping = false
        this.attitude = 0
        this.jumpTime = -18.25
    }
    calcDisplay() {
        if(this.isJumping) {
            this.attitude = 800-this.y
            this.jumpTime += 0.5
            
            this.y = (0.9*(Math.pow(this.jumpTime, 2))+this.jumpTime+(300-this.height))
        }
        if(this.y <= 600-this.height) {
            
            //this.y += GRAVITY
        } else {
            this.isJumping = false
            this.jumpTime = -18.25
        }
        let points = [{x: this.x+this.width, y: this.y+this.width}, {x: this.x, y: this.y+this.width}]
        for(let i = 0; i < obstacles.length; i++) {
            if((points[0].x > obstacles[i].x && points[0].x < (obstacles[i].x + obstacles[i].width)) && points[0].y > (600-obstacles[i].height) || (points[1].x > obstacles[i].x && points[1].x < (obstacles[i].x + obstacles[i].width)) && points[1].y > (600-obstacles[i].height)) {
                this.reset()
                obstacles.push(new Obstacle())
                setTimeout(function() {
                    obstacles.push(new Obstacle())
                }, 400*speed)
                return
            }
        }
    }
    display() {
        noStroke()
        fill(139, 54, 209)
        rect(this.x, this.y, this.width, this.height)
        textSize(32)
        fill(0)
        text(this.score, 100, 100)
        
    }
    jump() {
        if(this.isJumping) return
        this.isJumping = true
    }
    reset() {
        this.width = 100
        this.height = 100
        this.x = 5
        this.y= 600-this.height
        this.score = 0
        this.isJumping = false
        this.attitude = 0
        this.jumpTime = -18.25
        obstacles = []
        speed = 5
    }
}