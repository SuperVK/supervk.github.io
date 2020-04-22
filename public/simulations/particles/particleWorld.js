class ParticleWorld {
    constructor(canvas, creatureAmount, foodAmount) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        this.radius = 125

        this.connections = []

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

        this.allParticles = []
    }
    frame() {
        this.allParticles = this.creatures.concat(this.food)
        this.moveEntities()
        this.checkConnections()
        this.draw()
    }
    moveEntities() {
        for(let creature of this.creatures) creature.move() 
    }
    checkConnections() {
        for(let creature of this.creatures) {
            let inRadiusParticles = this.allParticles.filter(p => p.pos.distanceTo(creature.pos) < creature.radius)
            for(let particle of inRadiusParticles) {
                if(particle.pos.distanceTo(creature.pos) > particle.radius) continue
                if(this.connections.findIndex(c => c.particle1.pos.x == creature.pos.x &&  c.particle1.pos.y == creature.pos.y && c.particle2.pos.x == particle.pos.x &&  c.particle2.pos.y == particle.pos.y) == -1) {
                    this.connections.push(new Connection(creature, particle))
                }
            }
        }
        for(let i in this.connections) {
            let connection = this.connections[i]
            let shortestRadius = (connection.particle1.radius < connection.particle2.radius) ? connection.particle1.radius : connection.particle2.radius
            let distance = connection.particle1.pos.distanceTo(connection.particle2.pos)

            if(distance > shortestRadius) this.connections.splice(i, 1)
            connection.time++

            connection.updateRange()
        }
    }
    addConnection(particle1, particle2) {
        let distance = particle1.pos.distanceTo(particle2)
        if(distance < particle1.radius || distance < particle1.radius) return
        this.connections.push(new Connection(particle1, particle2))
    }
    draw() {

        this.ctx.fillStyle = `rgb(16, 16, 16)`
        this.ctx.fillRect(0, 0, canvas.width, canvas.height)

        for(let connection of this.connections) {
            this.ctx.beginPath()
            this.ctx.strokeStyle = 'white'
            this.ctx.lineWidth = connection.range
            this.ctx.moveTo(connection.particle1.pos.x, connection.particle1.pos.y)
            this.ctx.lineTo(connection.particle2.pos.x, connection.particle2.pos.y)
            this.ctx.stroke()
        }

        for(let food of this.food) {
            this.ctx.beginPath()
            this.ctx.fillStyle = 'green'
            this.ctx.arc(food.pos.x, food.pos.y, 2, 0, 2 * Math.PI);
            this.ctx.fill()
            
        }

        for(let creature of this.creatures) {
            
            this.ctx.beginPath()
            this.ctx.fillStyle = '#09bbf7'
            this.ctx.arc(creature.pos.x, creature.pos.y, 2, 0, 2 * Math.PI);
            this.ctx.fill()
            
        }

    }
}