//ALL LENGTHS ARE IN CENTIMETER CUZ METRICS ARE GOOD
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const SP = {
  length: 158,
  width: 80.8,
  price: 399.50,
  maxpower: 170,
  spacingflat: 20,
  angle: 36
}


const scale = 0.2
const rooftop = new Rooftop(4000, 2000)