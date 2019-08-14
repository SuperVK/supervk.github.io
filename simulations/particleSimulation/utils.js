class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    distanceTo(vec) {
        return Math.sqrt((this.x-vec.x)**2+(this.y-vec.y)**2)
    }
    getMagnitude() {
        return Math.sqrt(this.x**2+this.y**2)
    }
    add(vec) {
        return new Vector2(vec.x+this.x, vec.y+this.y)
    }
    hash() {
        return this.x.toString()+this.y.toString()
    }
}

class Connection {
    constructor(particle) {
        this.time = 0
        this.particle = particle
    }

}

