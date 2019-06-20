class Rooftop {
  constructor(width, length) {
    this.roofwidth = width-200
    this.rooflength = length-200
    
    //1-2 (and string)
    this.orientation = '1'
    
    //1-2 (and string)
    this.angled = '1'
    
    
    this.updateValues('1','1')
    
  }
  updateValues(orientation, angled) {
    this.SPwidth = 0
    this.SPlength = 0
    this.SPlengthFlat = 0
    this.SPwidthFlat = 0
    
    if(angled == '1') {
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
    if(orientation == '1') {
      this.SPInLength = Math.floor(this.rooflength/this.SPlength)
      this.SPInWidth = Math.floor(this.roofwidth/this.SPwidth)
    } else {
      this.SPInLength = Math.floor(this.rooflength/this.SPwidth)
      this.SPInWidth = Math.floor(this.roofwidth/this.SPlength)
    }
    this.totalSPs = this.SPInLength*this.SPInWidth
    console.log(this.totalSPs)
    this.draw()
  }
  draw() {
    ctx.fillStyle = 'lightgrey'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    for(let x = 0; x < this.SPInLength; x++) {
      for(let y = 0; y < this.SPInWidth; y++) {
        let gradient;
        if(this.angled == '2') {
          gradient = ctx.createLinearGradient(x*this.SPwidth*scale, 0, (x+1)*this.SPwidthFlat*scale, 0)
        } else {
          gradient = ctx.createLinearGradient(0, y*this.SPlength*scale, 0, (y+1)*this.SPlengthFlat*scale)
        }
        gradient.addColorStop(0, 'white')
        gradient.addColorStop(1, 'black')
        ctx.fillStyle = gradient
        if(this.orientation == '2') {
          ctx.fillRect(x*this.SPwidth*scale, y*this.SPlength*scale, (x+1)*this.SPwidthFlat*scale, (y+1)*this.SPlengthFlat*scale)
        } else {
          ctx.fillRect(x*this.SPwidth*scale, y*this.SPlength*scale, (x+1)*this.SPwidthFlat*scale, (y+1)*this.SPlengthFlat*scale)
        }
      }
    }
  }
}
let RADIANS = (degrees) => degrees * (Math.PI/180);
