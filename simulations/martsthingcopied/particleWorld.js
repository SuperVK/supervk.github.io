class ParticleWorld {
    constructor(canvas, particleAmount) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        this.radius = 125

        this.particles = []
        for(let p = 0; p < particleAmount; p++) {
            let randomPos = new Vector2(Math.floor(Math.random()*canvas.width-20)+10, Math.floor(Math.random()*canvas.height-20)+10)
            
            let randomVel = new Vector2(Math.random()*1-0.5, Math.random()*1-0.5)
            this.particles.push(new Particle(randomPos, randomVel))
        }
    }
    frame() {
        this.moveEntities()
        this.draw()
    }
    moveEntities() {
        for(let particle of this.particles) {
            particle.pos.x += particle.vel.x
            particle.pos.y += particle.vel.y
            if(particle.pos.y < 2 || particle.pos.y > this.canvas.height-2) particle.vel.y = particle.vel.y*-1    
            if(particle.pos.x < 2 || particle.pos.x > this.canvas.width-2) particle.vel.x = particle.vel.x*-1
        }
    }
    draw() {

        this.ctx.fillStyle = `rgb(16, 16, 16)`
        this.ctx.fillRect(0, 0, canvas.width, canvas.height)
        for(let particle of this.particles) {
            for(let otherparticle of this.particles) {
                this.ctx.beginPath()
                if(otherparticle.pos.x == particle.pos.x && otherparticle.pos.y == particle.pos.y) continue
                let distance = particle.pos.distanceTo(otherparticle.pos)
                if(distance > this.radius) continue

                let opacity = 1-(distance/this.radius)
                
                this.ctx.strokeStyle = 'white'
                this.ctx.lineWidth = opacity*1
                this.ctx.moveTo(particle.pos.x, particle.pos.y)
                this.ctx.lineTo(otherparticle.pos.x, otherparticle.pos.y)
                this.ctx.stroke()
            }
            this.ctx.beginPath()
            this.ctx.fillStyle = 'white'
            this.ctx.arc(particle.pos.x, particle.pos.y, 2, 0, 2 * Math.PI);
            this.ctx.fill()
            
        }
    }
}