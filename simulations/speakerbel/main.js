const I0 = 1e-12
const rendamentdb  = 100
const rendament = Math.pow(10, rendamentdb / 10) * IO * 4 * Math.PI * 1
const wattsIn = 400
const speakerWatt = rendament*wattsIn
const canvas1 = document.getElementById('canvas')
const infoDOM = document.getElementById('info')
const disco = new Disco(40, 20, canvas1, infoDOM)



