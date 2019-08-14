class Particle {
    constructor(pos) {
        this.pos = pos
        this.connections = []
    }
    addConnection(particle) {
        this.connections.push(new Connection(particle))
    }
}

class Creature extends Particle {
    constructor(pos, vel) {
        super(pos)
        //it's only the magnitude
        if(typeof vel == 'number') {
            let x = Math.random()*vel
            let y = Math.sqrt(vel**2-x**2)
            let negX = Math.round(Math.random()) ? 1 : -1
            let negY = Math.round(Math.random()) ? 1 : -1
            this.vel = new Vector2(x*negX, y*negY)
           
        //or not
        } else {
            this.vel = vel
        }
        this.radius = 125
    }
    process() {
        this.pos = this.pos.add(this.vel)
        if(this.pos.x < 2 || this.pos.x > canvas.width-2) this.vel.x = this.vel.x*-1
        if(this.pos.y < 2 || this.pos.y > canvas.height-2) this.vel.y = this.vel.y*-1
    }
}

class Food extends Particle {
    constructor(pos) {
        super(pos)
    }
}