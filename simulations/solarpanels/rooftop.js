class Rooftop {
  constructor(width, length) {
    this.roofwidth = width-200
    this.rooflength = length-200
    
    //1-2 (and string)
    this.orientation = document.getElementById('orientation').value
    
    //1-2 (and string)
    this.angled = document.getElementById('angled').value
    
    
    this.updateValues()
    
  }
  updateValues() {
    this.SPwidth = 0
    this.SPlength = 0
    this.SPlengthFlat = 0
    this.SPwidthFlat = 0
    
    if(this.angled == '2') {
      this.SPwidth = ((SP.width+10)*Math.sin(RADIANS(SP.angle)))/Math.tan(RADIANS(90-SP.angle))+((SP.width+10)*Math.cos(RADIANS(SP.angle)))
      this.SPlength = SP.length+20
      this.SPwidthFlat = SP.width*Math.cos(RADIANS(SP.angle))
      this.SPlengthFlat = SP.length
    } else {
      this.SPwidth = SP.width+20
      this.SPlength = ((SP.length+10)*Math.sin(RADIANS(SP.angle)))/Math.tan(RADIANS(90-SP.angle))+((SP.length+10)*Math.cos(RADIANS(SP.angle)))
      this.SPwidthFlat = SP.width
      this.SPlengthFlat = SP.length*Math.cos(RADIANS(SP.angle))
    }
    
    this.SPInLength = 0
    this.SPInWidth = 0
    if(this.orientation == '2') {
      this.SPInLength = Math.floor(this.rooflength/this.SPlength)
      this.SPInWidth = Math.floor(this.roofwidth/this.SPwidth)
    } else {
      this.SPInLength = Math.floor(this.rooflength/this.SPwidth)
      this.SPInWidth = Math.floor(this.roofwidth/this.SPlength)
    }
    console.log(this.SPInLength, this.SPInWidth)
    this.totalSPs = this.SPInLength*this.SPInWidth
    
    if(this.orientation == '2') {
      this.spacing = {
        x: this.SPwidth*scale,
        y: this.SPlength*scale
      }
    } else {
      this.spacing = {
        x: this.SPlength*scale,
        y: this.SPwidth*scale
      }
    }
    this.lineWidth = {
      x: (this.SPwidth-this.SPwidthFlat)*scale,
      y: (this.SPlength-this.SPlengthFlat)*scale
    }


    this.draw()
  }
  draw() {
    ctx.fillStyle = 'lightgrey'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    
    for(let x = 0; x < this.SPInWidth; x++) {
     
      for(let y = 0; y < this.SPInLength; y++) {
        
        let gradient;
        if(this.angled == '2') {
          gradient = ctx.createLinearGradient((this.spacing.x*x+100*scale)-this.lineWidth.x, 0, ((x+1)*this.spacing.x+100*scale)-this.lineWidth.x, 0)
        } else {
          gradient = ctx.createLinearGradient(0, (y*this.spacing.y+100*scale-this.lineWidth.y), 0, ((y+1)*this.spacing.y+100*scale)-this.lineWidth.y)
        }
        gradient.addColorStop(0, 'white')
        gradient.addColorStop(1, 'black')
        ctx.fillStyle = gradient
   
        ctx.fillRect((x*this.spacing.x)+100*scale, (y*this.spacing.y)+100*scale, this.spacing.x, this.spacing.y)
        ctx.beginPath()
        ctx.fillStyle = 'lightgrey'
        ctx.rect(100*scale, (this.spacing.y*(y+1)-this.lineWidth.y)+100*scale, (this.spacing.x*this.SPInWidth),this.lineWidth.y)
        ctx.fill()
        ctx.beginPath()
      }
      ctx.beginPath()
      ctx.fillStyle = 'lightgrey'
      ctx.rect((this.spacing.x*(x+1)-this.lineWidth.x)+100*scale, 100*scale, this.lineWidth.x, (this.spacing.y*this.SPInLength))
      ctx.fill()
      
    }

  }
  updateSettings() {
    this.orientation = document.getElementById('orientation').value
    this.angled = document.getElementById('angled').value
    this.updateValues()
  }
}
let RADIANS = (degrees) => degrees * (Math.PI/180);
