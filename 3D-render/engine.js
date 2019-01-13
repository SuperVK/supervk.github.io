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
    render(mode) {
        //if mode is passed in, use that, otherwise use the default
        if(!mode) mode = this.mode

        switch(mode) {
            case 'orthographic': {
                //sort on distance from camera, so the render order is correct
                let objects = this.objects
                objects.sort((a,b) => {
                    let verA = engine._getAverageVertex(a.vertices)
                    let verB = engine._getAverageVertex(b.vertices)
                    //pythagorras
                    return Math.sqrt(Math.pow(verB.y,2)+Math.pow(verB.x,2))-Math.sqrt(Math.pow(verA.y,2)+Math.pow(verA.x,2))
                })

                for(let object of this.objects) {

                    let faces = object.faces
                    faces.sort((a,b) => {
                        let verA = engine._getAverageVertex(a.points)
                        let verB = engine._getAverageVertex(b.points)
                        //pietagogras
                        return Math.sqrt(Math.pow(verB.y,2)+Math.pow(verB.x,2))-Math.sqrt(Math.pow(verA.y,2)+Math.pow(verA.x,2))
                    })

                    for(let face of faces) {
                        let points = this.camera.project(face.points)

                        ctx.beginPath()
                        ctx.lineWidth = 5
                        if(points[0] != undefined) ctx.moveTo(points[0].x, points[0].y)
                        for(let i in points) {
                            if(i == 0) continue
                            ctx.lineTo(points[i].x, points[i].y)
                            //console.log(points[i].x)
                        }
                        ctx.closePath()
                        ctx.fillStyle = face.color
                        ctx.fill()
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
        
        //the difference with the previous every vertices has to move in
        let difference = {
            x: 0,
            y: 0,
            z: 0,
            rotX: 0,
            rotY: 0,
            rotZ: 0
        }

        if(keysDown['87']) difference.y -= SPEED //W
        if(keysDown['83']) difference.y += SPEED //S
        if(keysDown['65']) difference.x += SPEED //A
        if(keysDown['68']) difference.x -= SPEED //S
        if(keysDown['32']) difference.z += SPEED //SPACE
        if(keysDown['16']) difference.z -= SPEED //SHIFT

        difference.rotX = mousemoves.y*-0.001
        difference.rotZ = mousemoves.x*0.001
        mousemoves.x = 0
        mousemoves.y = 0

        //lock it when looking too much up
        if(this.camera.rot.x - difference.rotX < -Math.PI/2) difference.rotX = 0

        // if(keysDown['38']) difference.rotX += 0.008 //ARROWUP
        // if(keysDown['40']) difference.rotX -= 0.008 //ARROWDOWN
        // if(keysDown['37']) difference.rotZ -= 0.008 //ARROWRIGHT
        // if(keysDown['39']) difference.rotZ += 0.008 //ARROWLEFT

        

        for(let i in this.objects) {
            for(let j in this.objects[i].vertices) {
 
                //rotate everything back so the forward isn't related to the rotation of the camera, but instead the global world
                this.rotateVertex(this.camera.rot.x, 'x', this.objects[i].vertices[j])
                this.rotateVertex(this.camera.rot.y, 'y', this.objects[i].vertices[j])
                
                this.objects[i].vertices[j].y += difference.y
                this.objects[i].vertices[j].x += difference.x
                this.objects[i].vertices[j].z += difference.z
            
                //rotate everything back again to the original state
                this.rotateVertex(-this.camera.rot.y, 'y', this.objects[i].vertices[j])
                this.rotateVertex(-this.camera.rot.x, 'x', this.objects[i].vertices[j])

                //take back to global so it's global and doesn't fuck up anything
                //https://gamedev.stackexchange.com/questions/136174/im-rotating-an-object-on-two-axes-so-why-does-it-keep-twisting-around-the-thir
                this.rotateVertex(this.camera.rot.x, 'x', this.objects[i].vertices[j])
                this.rotateVertex(difference.rotZ, 'z', this.objects[i].vertices[j])
                this.rotateVertex(-this.camera.rot.x, 'x', this.objects[i].vertices[j])

                this.rotateVertex(difference.rotY, 'y', this.objects[i].vertices[j])
                this.rotateVertex(difference.rotX, 'x', this.objects[i].vertices[j])
                
                
        

                
            }
        
            
        
        }
        this.camera.x -= difference.x
        this.camera.y -= difference.y 
        this.camera.rot.x -= difference.rotX
        this.camera.rot.z -= difference.rotZ
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
    _getAverageVertex(points) {
        let total = {
            x: 0, 
            y: 0, 
            z: 0
        }
        for(let vertex of points) {
            total.x += vertex.x
            total.y += vertex.y
            total.z += vertex.z
        }
        return {
            x: total.x/points.length,
            y: total.y/points.length,
            z: total.z/points.length
        }
    }
    
}