class Disco {
    constructor(width, height, bombAmount) {
        this.width = width
        this.height = height

        //pixel
        this.spacingX = canvas.width/width
        this.spacingY = canvas.height/height
        //will be a 2d array
        this.grid = []
        
        this.speakers = []

        this.genGrid()

    }
    leftClick(x,y) {
        console.log(x,y)
        this.speakers.push({
           x: x,
           y: y,
           watt: 100
       })
       this.update()
    }
    rightClick() {
        //unimplemented
    }
    genGrid() {
        for(let x = 0; x < this.width; x++) {
            //set every column to a new array
            this.grid[x] = []
            for(let y = 0; y < this.height; y++) {
                this.grid[x][y] = {
                    speakerWatt: 0,
                    wattmeter2: 0,
                    decibel: 0
                }
            }
        }
        this.update()

    }
    //update the game visually
    update() {
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        for(let speaker of this.speakers) {
            this.grid[speaker.x][speaker.y].speakerWatt = speaker.watt
        }

        for(let x in this.grid) {
            for(let y in this.grid[x]) {
                ctx.beginPath()
                ctx.strokeStyle = '#aaf'
                ctx.lineWidth = this.spacingX/100

                let totalwattmeter2 = 0

                for(let speaker of this.speakers) {
                    let distance = Math.sqrt((speaker.x-x)**2 + (speaker.y-y)**2)
                    totalwattmeter2 += (speaker.watt)/(4*Math.PI*(distance**2))
                }


                this.grid[x][y].wattmeter2 = totalwattmeter2
                let decibel = this.grid[x][y].decibel = 10*Math.log10(totalwattmeter2/I0)
                if(totalwattmeter2 == 0) decibel = 0
                if(Math.random() < 0.001) console.log(decibel)

                ctx.fillStyle = `rgba(0, 0, 0, ${(decibel)/120})`
                if(this.grid[x][y].speakerWatt) ctx.fillStyle = ''
                //choose the color of the block
                ctx.rect(this.spacingX*x, this.spacingY*y, this.spacingX, this.spacingY)
                ctx.fill()
                ctx.stroke()
            }
        }
    }

}


function Speaker(watt, x, y) {
    this.watt = watt
    this.x = x
    this.y = y
}

