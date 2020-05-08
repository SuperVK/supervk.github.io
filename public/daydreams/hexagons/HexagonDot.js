class HexagonDot {
    constructor(vec, height) {
        this.vec = vec
        this.height = height
        this.color = this.getPerlinColor(height)

    }
    getPerlinColor(value) {
        let range = 360
        return 'hsl('+((value*range)+360)/2+ ', 100%, ' + (value*50)+50 + '%)'
    }
    setHeight(height) {
        this.height = height
        this.color = this.getPerlinColor(height)
    }
}