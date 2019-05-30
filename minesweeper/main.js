const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// canvas.height = window.innerHeight
// canvas.width = window.innerHeight

const game = new Minesweeper(40, 40, 120)

