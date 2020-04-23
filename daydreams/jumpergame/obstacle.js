class Obstacle {
    constructor(random) {
        if(random == undefined) random = 0
        if(Math.random() > 0.5) {
            this.width = Math.round(100*(Math.random() + 1))
            this.height = 100
        } else {
            this.height = Math.round(100*(Math.random() + 1))
            this.width = 100
        }
        // this.height = 100
        // this.width = 100
        this.y = 600-this.height
        this.x = 1200+random+this.width+200
        this.actived = false
    }
    move() {
        this.x -= speed
    }
    display() {
        noStroke()
        fill(255, 245, 58)
        rect(this.x, this.y, this.width, this.height, 20)
    }
}