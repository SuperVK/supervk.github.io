class ParticleWorld {
    constructor(canvas, creatureAmount, foodAmount) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        this.radius = 125

        this.creatures = []
        for(let p = 0; p < creatureAmount; p++) {
            let randomPos = new Vector2(Math.floor(Math.random()*canvas.width-20)+10, Math.floor(Math.random()*canvas.height-20)+10)
            let magnitude = Math.random()*0.5+0.5
            this.creatures.push(new Creature(randomPos, magnitude))
        }
        this.food = []
        for(let f = 0; f < foodAmount; f++) {
            let randomPos = new Vector2(Math.floor(Math.random()*canvas.width-20)+10, Math.floor(Math.random()*canvas.height-20)+10)
            this.food.push(new Food(randomPos))
        }
    }
    frame() {
        this.moveEntities()
        this.draw()
    }
    moveEntities() {
        for(let creature of this.creatures) creature.process()
        for(let creature of this.creatures) {
            for(let subcreature of this.creatures) {
                if(subcreature.pos.hash() == creature.pos.hash()) continue
                let connecIndex = creature.connections.findIndex(c => c.particle.pos.hash() == subcreature.pos.hash())
                let connec = creature.connections[connecIndex]
                if(subcreature.pos.distanceTo(creature.pos) > creature.radius) {
                    if(connec != undefined) creature.connections.splice(connecIndex, 1)
                } else {
                    if(connec == undefined) creature.addConnection(subcreature)
                    else connec.time++
                }
            }
        }
        
    }
    draw() {

        this.ctx.fillStyle = `rgb(16, 16, 16)`
        this.ctx.fillRect(0, 0, canvas.width, canvas.height)
        for(let creature of this.creatures) {
            for(let connection of creature.connections) {
                this.ctx.beginPath()
                
                let distance = creature.pos.distanceTo(connection.particle.pos)
                let opacity = 1-(distance/creature.radius)

                this.ctx.strokeStyle = 'white'
                this.ctx.lineWidth = opacity*1
                this.ctx.moveTo(creature.pos.x, creature.pos.y)
                this.ctx.lineTo(connection.particle.pos.x, connection.particle.pos.y)
                this.ctx.stroke()
            }
            this.ctx.beginPath()
            this.ctx.fillStyle = 'white'
            this.ctx.arc(creature.pos.x, creature.pos.y, 2, 0, 2 * Math.PI);
            this.ctx.fill()
            
        }
    }
}