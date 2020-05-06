class HexagonGrid {
    constructor(size) {
        this.hexagonLineLength = size

        this.hexagonOffsets = {   //The offset needed in drawing for each hexagon based on the partlength
            x: this.hexagonLineLength+Math.sin(Math.PI/6)*this.hexagonLineLength,
            y: Math.cos(Math.PI/6)*this.hexagonLineLength*2
        }

        this.simplex = openSimplexNoise(Date.now())

        this.dots = []
        this.lines = []
        this.generateGrid()
    }
    draw() {
        ctx.fillStyle = 'red'
        ctx.strokeStyle = 'lime'
        ctx.lineWidth = 3
    
        for(let line of this.lines) {
            ctx.beginPath()
            let gradient = ctx.createLinearGradient(line.dot0.vec.x, line.dot0.vec.y, line.dot1.vec.x, line.dot1.vec.y)
            gradient.addColorStop(0, line.dot0.color)
            gradient.addColorStop(1, line.dot1.color)
            ctx.strokeStyle = gradient
            ctx.moveTo(line.dot0.vec.x, line.dot0.vec.y)
            ctx.lineTo(line.dot1.vec.x, line.dot1.vec.y)
            ctx.stroke()
        }
        for(let dot of this.dots) {
            ctx.beginPath()
            ctx.fillStyle = dot.color
            ctx.arc(dot.vec.x, dot.vec.y, 5, 0, Math.PI*2)
            ctx.fill()
        }

    }
    generateGrid() {
        for(let y = 1; y <= canvas.height/this.hexagonOffsets.y+2; y++) {
            for(let x = 0; x <= canvas.width/this.hexagonOffsets.x; x++) {
                let locations = [new Vec2(x*this.hexagonOffsets.x, x%2==0 ? y*this.hexagonOffsets.y : y*this.hexagonOffsets.y+(this.hexagonOffsets.y/2))]
                let currentRot = 0
                if(this.dots.findIndex(d => d.x == locations[locations.length-1].x && d.y == locations[locations.length-1].y) == -1) {
                    this.dots.push(new HexagonDot(
                        locations[locations.length-1],
                        this.simplex.noise2D(locations[locations.length-1].x, locations[locations.length-1].y)
                    ))
                }
                for(let i = 0; i < 6; i++) {
                    // Add the next dot in the hexagon
                    locations.push(new Vec2(
                        locations[locations.length-1].x+Math.cos(currentRot)*(this.hexagonLineLength),
                        locations[locations.length-1].y+Math.sin(currentRot)*(this.hexagonLineLength)
                    ))
                    

                    // Check if dot exists  
                    if(this.dots.findIndex(d => d.x == locations[locations.length-1].x && d.y == locations[locations.length-1].y) == -1) {
                        this.dots.push(new HexagonDot(
                            locations[locations.length-1],
                            this.simplex.noise2D(locations[locations.length-1].x, locations[locations.length-1].y)
                        ))
                    }

                    
                    if(this.lines.findIndex(l =>
                        (l.dot0.vec.matches(locations[locations.length-1]) && l.dot1.vec.matches(locations[locations.length-2])) ||
                        (l.dot0.vec.matches(locations[locations.length-2]) && l.dot1.vec.matches(locations[locations.length-1])) 
                    ) == -1) {
                        this.lines.push(new HexagonLine(
                            this.dots.find(d => d.vec.matches(locations[locations.length-2])),
                            this.dots.find(d => d.vec.matches(locations[locations.length-1])),
                            this.simplex.noise2D(locations[locations.length-2].x, locations[locations.length-2].y),
                            this.simplex.noise2D(locations[locations.length-1].x, locations[locations.length-1].y)
                        ))
                    }
                    currentRot -= Math.PI/3
                }

                if(this.lines.findIndex(l =>
                    (l.dot0.vec.matches(locations[locations.length-1]) && l.dot1.vec.matches(locations[0])) ||
                    (l.dot0.vec.matches(locations[0]) && l.dot1.vec.matches(locations[locations.length-1])) 
                ) == -1) {
                    this.lines.push(new HexagonLine(
                        this.dots.find(d => d.vec.matches(locations[0])),
                        this.dots.find(d => d.vec.matches(locations[locations.length-1])),
                        this.simplex.noise2D(locations[0].x, locations[0].y),
                        this.simplex.noise2D(locations[locations.length-1].x, locations[locations.length-1].y)
                    ))
                }

            }
        }
    }
}