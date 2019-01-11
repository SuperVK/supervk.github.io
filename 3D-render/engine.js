class Engine3D {
    constructor() {
        console.log('Firing up the engine!')
        this.objects = [new Cube(new Vertex3(200,600,0), 100), new Cube(new Vertex3(-200,400,0), 100)]
        this.isPaused = false

        this.camera = new Camera(1000)
        this.mode = 'orthographic'
        this.mouse = {
            wasDown: false,
            lastPosition: {
                x: 0,
                y: 0
            }
        }
    }
    wipe() {
        ctx.beginPath()
        ctx.fillStyle = '#b7b7b7'
        ctx.rect(canvas.width/-2,canvas.height/-2,canvas.width,canvas.height)
        ctx.fill()
    }
    render(_mode) {
        let mode;
        if(_mode) mode = _mode
        else mode = this.mode

        switch(mode) {
            case 'orthographic': {
                
                for(let object of this.objects) {
                    // console.log(object)
                    for(let face of object.faces) {
                        let points = this.camera.project(face)

                        ctx.beginPath()
                        ctx.moveTo(points[0].x, points[0].y)
                        for(let i in points) {
                            if(i == 0) continue
                            ctx.lineTo(points[i].x, points[i].y)
                            //console.log(points[i].x)
                        }
                        ctx.closePath()
                        ctx.stroke()
                    }
                }
                break;
            }
            case 'perspective': {
                
                for(let object of this.objects) {
                    for(let face of object.faces) {
                        let points = this.project(face)

                        ctx.beginPath()
                        ctx.moveTo(points[0].x, points[0].y)
                        for(let i in points) {
                            if(i == 0) continue
                            ctx.lineTo(points[i].x, points[i].y)
                        }
                        ctx.closePath()
                        ctx.stroke()
                    }
                }
                break;
            }
            case 'vertices': {
                
                for(let face of this.cube.faces) {
                    let points = this.project(face)
                    ctx.beginPath()
                    ctx.strokeRect(points[0].x, points[0].y, 1, 1)
                    for(let i in points) {
                        if(i == 0) continue
                        ctx.strokeRect(points[i].x, points[i].y, 1, 1)
                    }
                    ctx.stroke()
                }
                break
            }
        }
    }
    move() {
        
        let directions = {}

        if(keysDown['87']) directions['forwards'] = true
        if(keysDown['83']) directions['backwards'] = true
        if(keysDown['65']) directions['left'] = true
        if(keysDown['68']) directions['right'] = true
        if(keysDown['38']) directions['up'] = true
        if(keysDown['40']) directions['down'] = true
       
        let x;
        let y;
        if(mouseDown[0]) {
            if(!this.mouse.wasDown) {
                this.mouse.wasDown = true
            } else {
                x = mouseDown[1]-this.mouse.x
                y = mouseDown[2]-this.mouse.y
               
            }
        } else {
            this.mouse.wasDown = false
        }
        this.mouse.x = mouseDown[1]
        this.mouse.y = mouseDown[2]
        for(let i in this.objects) {
            for(let j in this.objects[i].vertices) {
                if(mouseDown[0]) {
                    if(x > 0) this.objects[i].vertices[j] = this.rotateVertex(x*0.0001, 'x', this.objects[i].vertices[j])
                    if(y > 0) this.objects[i].vertices[j] = this.rotateVertex(y*0.0001, 'y', this.objects[i].vertices[j])
                }
                
                if(keysDown['87']) this.objects[i].vertices[j].y -= 10
                if(keysDown['83']) this.objects[i].vertices[j].y += 10
                if(keysDown['65']) this.objects[i].vertices[j].x += 10
                if(keysDown['68']) this.objects[i].vertices[j].x -= 10
                if(keysDown['38']) this.objects[i].vertices[j] = engine.rotateVertex(0.008, 'x', this.objects[i].vertices[j])
                if(keysDown['40']) this.objects[i].vertices[j] = engine.rotateVertex(-0.008, 'x', this.objects[i].vertices[j])
                
            }
        
            
        
        }
    }
    rotateVertex(degree, axis, vertex, center) {
        if(center == undefined) center = new Vertex3(0,0,0)
        switch(axis) {
            case 'y': {
                let z = vertex.z-center.z
                let x = vertex.x-center.x
                vertex.z = z*Math.cos(degree)-x*Math.sin(degree)
                vertex.x = z*Math.sin(degree)+x*Math.cos(degree)
                vertex.z = vertex.z+center.z
                vertex.x = vertex.x+center.x
                break;
            }
            case 'z': {
                let x = vertex.x-center.x
                let y = vertex.y-center.y
                vertex.x = x*Math.cos(degree)-y*Math.sin(degree)
                vertex.y = x*Math.sin(degree)+y*Math.cos(degree)
                vertex.x = vertex.x+center.x
                vertex.y = vertex.y+center.y
                break;
            }
            case 'x': {
                let y = vertex.y-center.y
                let z = vertex.z-center.z
                vertex.y = y*Math.cos(degree)-z*Math.sin(degree)
                vertex.z = y*Math.sin(degree)+z*Math.cos(degree)
                vertex.y = vertex.y+center.y
                vertex.z = vertex.z+center.z
                break;
            }
        }
        return vertex
    }
    project(vertices) {
        if(vertices.length == undefined) return new Vertex2(vertices.x, vertices.z)
        let points = []
        for(let vertex of vertices) {
            points.push(this.project(vertex))
        }
        return points
    }
    
}