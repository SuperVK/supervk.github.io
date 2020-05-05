class HexagonDot {
    constructor(x, y, perlin) {
        this.x = x
        this.y = y
        this.color = this.getPerlinColor(perlin)
        this.perlin = perlin

    }
    getPerlinColor(value) {
        let range = 480
        return 'hsl('+((value*range)+range)/2+ ', 100%, 50%)'
    }
}