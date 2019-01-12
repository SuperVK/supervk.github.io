function Vertex2(x,y) {
    this.x = x;
    this.y = y;
}

function Vertex3(x,y,z) {

    this.x = x;
    this.y = y;
    this.z = z;

}

class Cube {
    constructor(center, size) {
        if(typeof size == 'number') size = new Vertex3(size, size, size)
        this.center = center
        // console.log(center)
        // console.log(size)
        // console.log(center.x-size.x)
        this.vertices = [
            new Vertex3(center.x - size.x, center.y - size.y, center.z - size.z),
            new Vertex3(center.x + size.x, center.y - size.y, center.z - size.z),
            new Vertex3(center.x - size.x, center.y - size.y, center.z + size.z),
            new Vertex3(center.x + size.x, center.y - size.y, center.z + size.z),
            new Vertex3(center.x - size.x, center.y + size.y, center.z - size.z),
            new Vertex3(center.x + size.x, center.y + size.y, center.z - size.z),
            new Vertex3(center.x - size.x, center.y + size.y, center.z + size.z),
            new Vertex3(center.x + size.x, center.y + size.y, center.z + size.z)
        ]
        this.faces = [
            [this.vertices[0], this.vertices[1], this.vertices[3], this.vertices[2]],
            [this.vertices[1], this.vertices[5], this.vertices[7], this.vertices[3]],
            [this.vertices[5], this.vertices[4], this.vertices[6], this.vertices[7]],
            [this.vertices[4], this.vertices[6], this.vertices[2], this.vertices[0]],
            [this.vertices[2], this.vertices[3], this.vertices[7], this.vertices[6]],
            [this.vertices[0], this.vertices[4], this.vertices[5], this.vertices[1]]
        ]
        this.colors = [
            '#C41E3A',
            '#009E60',
            '#0051BA',
            '#FF5800',
            '#FFD500',
            '#FFFFFF'
        ]
   
    }
    
    rotate(degree, axis) {
        for(let i in this.vertices) {
            this.vertices[i] = engine.rotateVertex(degree, axis, this.vertices[i], this.center)
        }
    }
}

class Camera {
    constructor(fov) {

        this.x = 0
        this.y = 0
        this.z = 0
        
        this.rot = {
            x: 0,
            y: 0,
            z: 0
        }
        this.fov = fov
        
    }
    //takes either an object or a plane
    project(vertices) {
        if(vertices.length == undefined) {
            return new Vertex2((this.fov*vertices.x)/vertices.y, (this.fov*vertices.z)/vertices.y)
            //return new Vertex2(this.distance/vertices.y*vertices.x, this.distance/vertices.y*vertices.z)
        }
        // if(log) {
        //     console.log(vertices)
        //     //console.log((this.distance*vertices.x)/vertices.y, (this.distance*vertices.z)/vertices.y)
        //     log = false
        // }
        let points = []
        for(let vertex of vertices) {
            if(vertex.y < 0) continue
            points.push(this.project(vertex))
        }
        return points
    }
}