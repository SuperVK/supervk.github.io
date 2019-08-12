class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    distanceTo(vec) {
        return Math.sqrt((this.x-vec.x)**2+(this.y-vec.y)**2)
    }
}

