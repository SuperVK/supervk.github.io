class HexagonGrid {
    constructor(htmlCanvas) {
        this.htmlCanvas = htmlCanvas;
        this.ctx = this.htmlCanvas.getContext('2d');
        this.hexagonPartLength = 60 //the length of the "stick" of each hexagon

        this.hexagonOffsets = {   //The offset needed in drawing for each hexagon based on the partlength
            x: this.hexagonPartLength+Math.sin(Math.PI/6)*this.hexagonPartLength,
            y: Math.cos(Math.PI/6)*this.hexagonPartLength*2
        }

        this.simplex = openSimplexNoise(Date.now())
        this.time = 0
        this.grid = []
    }

    draw() {
        this.time += 0.01
        console.log(this.time)
        this.grid = []
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.htmlCanvas.width, this.htmlCanvas.height)
        for(let y = 1; y <= this.htmlCanvas.height/this.hexagonOffsets.y+2; y++) {
            for(let x = 0; x <= this.htmlCanvas.width/this.hexagonOffsets.x; x++) {
                this.drawChunk(x, y)
            }
        }
    }
    drawChunk(x, y) {
        let centerX = Math.round(x*this.hexagonOffsets.x)
        let centerY = Math.round(y*this.hexagonOffsets.y);
        if(x%2==1) centerY = Math.round(y*this.hexagonOffsets.y+(this.hexagonOffsets.y/2))


        if(!this.grid[centerX]) this.grid[centerX] = []
      

        this.grid[centerX][centerY] = new HexagonDot(centerX, centerY, this.getPerlinColor(this.simplex.noise3D(centerX, centerY, this.time)))
        this.ctx.fillStyle = '#46778C'
        this.ctx.strokeStyle = 'black'
        this.ctx.lineWidth = 3

        let currentLocation = this.grid[centerX][centerY]
        let previousLocation = this.grid[centerX][centerY]
        let currentRot = 0
        
        
        for(let i = 0; i < 6; i++) {
            previousLocation = currentLocation
            let newLocation = [currentLocation.x+Math.cos(currentRot)*(this.hexagonPartLength), currentLocation.y+Math.sin(currentRot)*(this.hexagonPartLength)]
            // console.log(newLocation)
            if(!this.grid[newLocation[0]]) this.grid[newLocation[0]] = []
            if(this.grid[newLocation[0]][newLocation[1]]) {
                currentLocation = this.grid[newLocation[0]][newLocation[1]]
            } else {
                this.grid[newLocation[0]][newLocation[1]] = new HexagonDot(newLocation[0], newLocation[1], this.getPerlinColor(this.simplex.noise3D(newLocation[0], newLocation[1], this.time)))
                currentLocation = this.grid[newLocation[0]][newLocation[1]]
            }

            // console.log(currentLocation)
           // let gradient = this.createGradient(previousLocation.x, previousLocation.y, currentLocation.x, currentLocation.y, previousLocation.color, currentLocation.color)

            // lines
            this.ctx.beginPath()
            this.ctx.moveTo(previousLocation.x, previousLocation.y)
            this.ctx.lineTo(currentLocation.x, currentLocation.y)
            this.ctx.strokeStyle = previousLocation.color
            this.ctx.stroke()
            


            // dots
            this.ctx.beginPath()
            this.ctx.fillStyle = previousLocation.color
            this.ctx.arc(previousLocation.x, previousLocation.y, 5, 0, Math.PI*2)
            this.ctx.fill()

            currentRot -= Math.PI/3
            // currentLocation = [currentLocation[0]+Math.cos(currentRot)*(this.hexagonPartLength), currentLocation[1]+Math.sin(currentRot)*(this.hexagonPartLength)]
            // currentRot -= Math.PI/3
        }

    }
    drawPart() {

    }
    createGradient(x0, y0, x1, y1, color1, color2) {
        let gradient = this.ctx.createLinearGradient(x0, y0, x1, y1)
        gradient.addColorStop(0, color1)
        gradient.addColorStop(1, color2)
        return gradient
    }
    getPerlinColor(value) {
        let range = 360
        return 'hsl('+((value*range)+range)/2+ ', 100%, 50%)'
    }
    getRandomColor() {
        return `rgb(${Math.random()*256}, ${Math.random()*256}, ${Math.random()*256})`
    }
}