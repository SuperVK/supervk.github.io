class Vec2 {
    constructor(x, y) {
        this.x = Math.round(x*1e6)/1e6;
        this.y = Math.round(y*1e6)/1e6;
    }
    matches(vec) {
        return vec.x == this.x && vec.y == this.y
    }
    add(vec) {
        return new Vec2(vec.x+this.x, vec.y+this.y)
    }
}