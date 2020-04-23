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
            {
                points: [this.vertices[0], this.vertices[1], this.vertices[3]],
                color: '#C41E3A'
            },
            {
                points: [this.vertices[0], this.vertices[3], this.vertices[2]],
                color: '#C41E3A'
            },
            {
                points: [this.vertices[1], this.vertices[5], this.vertices[7]],
                color: '#009E60'
            },
            {
                points: [this.vertices[1], this.vertices[7], this.vertices[3]],
                color: '#009E60'
            },
            {
                points: [this.vertices[5], this.vertices[4], this.vertices[6]],
                color: '#FF5800'
            },
            {
                points: [this.vertices[5], this.vertices[6], this.vertices[7]],
                color: '#FF5800'
            },
            {
                points: [this.vertices[4], this.vertices[6], this.vertices[2]],
                color: '#FFD500'
            },
            {
                points: [this.vertices[4], this.vertices[2], this.vertices[0]],
                color: '#FFD500'
            },
            {
                points: [this.vertices[2], this.vertices[3], this.vertices[7]],
                color: '#FFFFFF'
            },
            {
                points: [this.vertices[2], this.vertices[7], this.vertices[6]],
                color: '#FFFFFF'
            },
            {
                points: [this.vertices[0], this.vertices[4], this.vertices[5]],
                color: '#0051BA'
            },
            {
                points: [this.vertices[0], this.vertices[5], this.vertices[1]],
                color: '#0051BA'
            }
        ]
    }
    
    rotate(degree, axis) {
        for(let i in this.vertices) {
            this.vertices[i] = engine.rotateVertex(degree, axis, this.vertices[i], this.center)
        }
    }
}

let stop = false

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
    //takes either an plane or a vertex
    project(vertices) {
        if(stop) return
        if(vertices.length == undefined) {
            let vertex = vertices
            let r = this.fov/vertex.y
            if(r < 0) r = 1e9
            return new Vertex2(vertex.x*r, vertex.z*r)
        }

        let points = []

        //dealing with vertex of a plane being behind the camera, and creating fictive points that create the illusion of everything working just like real life
        let visiblePoints = []
        let invisPoints = 0
        for(let i in vertices) {
            let vertex = vertices[i]
            if(vertex.y < 0) {
                invisPoints++
                if(visiblePoints[Number(i)-1] != 'None' && visiblePoints[Number(i)-2] != 'None') visiblePoints.push('None')
            } else {
                visiblePoints.push(vertex)
            }
        }
        
        if(visiblePoints.includes('None')) {
            if(visiblePoints.filter((v) => v == 'None').length == 1) {
                let invisVertex = vertices.find((v) => v.y < 0)
                let invisVertexIndex = vertices.findIndex((v) => v.y < 0)
                let previousVertex = invisVertexIndex-1 < 0 ? visiblePoints[visiblePoints.length-1] : visiblePoints[invisVertexIndex-1]
                let nextVertex = invisVertexIndex+1 == visiblePoints.length ? visiblePoints[0] : visiblePoints[invisVertexIndex+1]

                let x1 = ((previousVertex.y+Math.abs(invisVertex.y))*(previousVertex.x))/Math.abs(invisVertex.y)
                let z1 = ((previousVertex.y+Math.abs(invisVertex.y))*(previousVertex.z))/Math.abs(invisVertex.y)

                let fakeVertex1 = Vertex3(x1,0,z1)

                let x2 = ((nextVertex.y+Math.abs(invisVertex.y))*(nextVertex.x))/Math.abs(invisVertex.y)
                let z2 = ((nextVertex.y+Math.abs(invisVertex.y))*(nextVertex.z))/Math.abs(invisVertex.y)



                let fakeVertex2 = Vertex3(x2,0,z2)

                if(fakeVertex2 == undefined) console.log(x2)

                visiblePoints[invisVertexIndex] = fakeVertex1 
                visiblePoints.splice(invisVertexIndex, 0, fakeVertex2)
            } else {

            }
        }

      //  console.log(visiblePoints)

        for(let vertex of visiblePoints) {
            if(vertex == undefined) {
                console.log(visiblePoints)
                stop = true
            }
            points.push(this.project(vertex))
        }
        return points
    }
}