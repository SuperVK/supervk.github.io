class Obstacle {
    constructor(random) {
        if(random == undefined) random = 0
        this.height = 100
        this.width = 100
        this.y = 600-this.height
        this.x = 1200+random+this.width
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