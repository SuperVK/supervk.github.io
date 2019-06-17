class Disco {
    constructor(width, height, canvas, infoDOM) {
        this.width = width
        this.height = height
	
	this.range = [0, 120]
	
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
	
	this.rendamentDB = Number(document.getElementById('rendament').value)
        this.wattsIn = Number(document.getElementById('watts').value)
	
	this.rendamentPerCent = Math.pow(10, this.rendamentDB / 10) * I0 * 4 * Math.PI
	this.Psound = this.rendamentPerCent * this.wattsIn
	
        //pixel
        this.spacingX = Math.ceil(this.canvas.width/width)
        this.spacingY = Math.ceil(this.canvas.height/height)

        this.canvas.width = this.spacingX*width
        this.canvas.height = this.spacingY*height
        //will be a 2d array
        this.grid = []
        
       
        this.speakers = []

        this.genGrid()

        canvas.addEventListener('contextmenu', event => event.preventDefault())
        canvas.addEventListener('mousedown', event => {
            //left click
            //the monster formula is for 
            if(event.buttons == 1) this.leftClick(Math.floor(event.clientX/this.spacingX), Math.floor(event.clientY/this.spacingY))
            else if(event.buttons == 2) this.rightClick(Math.floor(event.clientX/this.spacingX), Math.floor(event.clientY/this.spacingY))
            
        })
        canvas.addEventListener('mousemove', event => {
            this.hover(Math.floor(event.clientX/this.spacingX), Math.floor(event.clientY/this.spacingY))
        })
      
        document.getElementById('restart').addEventListener('mousedown', event => {
           	this.width = Number(document.getElementById('width').value)
            	this.height = Number(document.getElementById('height').value)

		this.rendamentDB = Number(document.getElementById('rendament').value)
        	this.wattsIn = Number(document.getElementById('watts').value)
	
		this.rendamentPerCent = Math.pow(10, this.rendamentDB / 10) * I0 * 4 * Math.PI
		this.Psound = this.rendamentPerCent * this.wattsIn
            //pixel
          
            this.canvas.width = this.spacingX*this.width
            this.canvas.height = this.spacingY*this.height
            this.speakers = []
            this.genGrid()
            this.update()
        })

        this.infoDOM = infoDOM
        

    }
    leftClick(x,y) {
        if(this.speakers.filter(s => s.x == x && s.y == y).length != 0) {
            this.speakers.splice(this.speakers.findIndex(s => s.x == x && s.y == y), 1)
            this.grid[x][y].speakerWatt = 0
        } else {
            this.speakers.push({
                x: x,
                y: y,
                watt: this.Psound
            })
        }
       this.update()
    }
    hover(x,y) {
        document.getElementById('tilex').innerHTML = x
        document.getElementById('tiley').innerHTML = y
        document.getElementById('tilewattmeter2').innerHTML = Math.round(this.grid[x][y].wattmeter2 * 10000)/10000
        document.getElementById('tiledecibel').innerHTML = Math.round(this.grid[x][y].decibel*100)/100
    }
    rightClick() {
        //unimplemented
    }
    genGrid() {
      this.grid = []
        for(let x = 0; x < this.width; x++) {
            //set every column to a new array
            this.grid[x] = []
            for(let y = 0; y < this.height; y++) {
                this.grid[x][y] = {
                    wattmeter2: 0,
                    irel: 0,
                    decibel: 0
                }
            }
        }
        this.update()

    }
    //update the game visually and logic wise
    update() {
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(0, 0, canvas.width, canvas.height)

        let max = 0
        let lowest = Infinity
        let totalDb = 0

        for(let x in this.grid) {
            for(let y in this.grid[x]) {
                //this gets executed for every tile

              
                this.ctx.beginPath()

                let totalwattmeter2 = 0

                for(let speaker of this.speakers) {
                    let distance = Math.sqrt((speaker.x-x)**2 + (speaker.y-y)**2)
                    totalwattmeter2 += (speaker.watt)/(4*Math.PI*(distance**2))
                }


                this.grid[x][y].wattmeter2 = totalwattmeter2
                this.grid[x][y].irel = totalwattmeter2/I0
                let decibel = 0
                if(totalwattmeter2 == 0) decibel = 0
                else decibel = this.grid[x][y].decibel = 10*Math.log10(this.grid[x][y].irel)

                if(decibel > 80) this.ctx.fillStyle = heatMapColorforValue((decibel - 80)/40)
                else this.ctx.fillStyle = heatMapColorforValue(0)
              
                //if tile is speaker
                if(this.speakers.findIndex(s => s.x == x && s.y == y) != -1) this.ctx.fillStyle = 'black'
                else {
                  if(this.grid[x][y].decibel > max) max = this.grid[x][y].decibel 
                  else if(this.grid[x][y].decibel < lowest) lowest = this.grid[x][y].decibel
                  
                  totalDb += this.grid[x][y].decibel
                }
              

                            
              
                //choose the color of the block
                this.ctx.rect(this.spacingX*x, this.spacingY*y, this.spacingX, this.spacingY)
                this.ctx.fill()

            }
        }



	
        document.getElementById('speakersAmount').innerHTML = this.speakers.length
        document.getElementById('highestDb').innerHTML = Math.round(max*100)/100
        document.getElementById('lowestDb').innerHTML = Math.round(lowest*100)/100
        document.getElementById('gridaverage').innerHTML = Math.round(totalDb/(this.width*this.height-this.speakers.length)*100)/100
    }

}

function Speaker(watt, x, y) {
    this.watt = watt
    this.x = x
    this.y = y
}

function heatMapColorforValue(value){
    var h = (1.0 - value) * 240
    return "hsl(" + h + ", 100%, 50%)";
}
