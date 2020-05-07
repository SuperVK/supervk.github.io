class HexagonDot {
    constructor(vec, height) {
        this.vec = vec
        this.height = height
        this.color = this.getPerlinColor(height)

    }
    getPerlinColor(value) {
        let range = 360
        return 'hsl('+((value*range)+range)/2+ ', 100%, 50%)'
    }
}