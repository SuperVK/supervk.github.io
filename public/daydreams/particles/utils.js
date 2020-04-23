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
}

class Connection {
    constructor(particle1, particle2) {
        this.time = 0
        this.particle1 = particle1
        this.particle2 = particle2
        this.range = 0
        this.updateRange()
    }
    updateRange() {
        let shortestRadius = this.particle1.radius < this.particle2.radius ? this.particle1.radius : this.particle2.radius
        let distance = this.particle1.pos.distanceTo(this.particle2.pos)

        this.range = 1-(distance/shortestRadius)
    }

}

