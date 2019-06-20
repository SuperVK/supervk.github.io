//ALL LENGTHS ARE IN CENTIMETER CUZ METRICS ARE GOOD
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth;
canvas.height = canvas.width/2;

let info = document.getElementById('info') 
info.style.top = canvas.height+10


const SP = {
  length: 158,
  width: 80.8,
  price: 399.50,
  maxpower: 170,
  spacingflat: 20,
  angle: 36
}


const scale = canvas.width/4000
const rooftop = new Rooftop(4000, 2000)

document.getElementById('orientation').addEventListener('change', () => rooftop.updateSettings())
document.getElementById('angled').addEventListener('change', () => rooftop.updateSettings())