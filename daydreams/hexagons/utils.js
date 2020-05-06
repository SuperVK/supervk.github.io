class Vec2 {
    constructor(x, y) {
        this.x = Math.round(x);
        this.y = Math.round(y);
    }
    matches(vec) {
        return vec.x == this.x && vec.y == this.y
    }
}