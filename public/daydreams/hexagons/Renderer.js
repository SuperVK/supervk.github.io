class Renderer {
    constructor() {
        this.createCircleProgram()
    }
    createCircleProgram() {
        let circlePositions = []

        for(let i = 0; i < 50; i += 0.01) {
            circlePositions.push([
                Math.cos(Math.PI*i), Math.sin(Math.PI*i),
                Math.cos(Math.PI*(i+0.01)), Math.sin(Math.PI*(i+0.01)),
                0, 0
            ])
        }


        const cirlceVertexShader = this.createShader(gl, gl.VERTEX_SHADER, circleVertexShaderSource);
        const circleFragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, circleFragmentShaderSource);

        this.circleProgram = this.createProgram(gl, cirlceVertexShader, circleFragmentShader);

        this.circlePositionAttribLocation = gl.getAttribLocation(this.circleProgram, "a_position")

        this.circleResolutionUniformLocation = gl.getUniformLocation(this.circleProgram, "u_resolution");
        this.circleColorUniformLocation = gl.getUniformLocation(this.circleProgram, "u_color");


        gl.useProgram(this.circleProgram)
        gl.uniform2f(this.circleResolutionUniformLocation, gl.canvas.width, gl.canvas.height)

        this.circlePositionBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.circlePositionBuffer);

    }
    calculatePositionsCirlce(x, y, size) {
        let circlePositions = []

        for(let i = 0; i < 2; i += 0.1) {
            circlePositions.push(
                x+Math.cos(Math.PI*i)*size, y+Math.sin(Math.PI*i)*size,
                x+Math.cos(Math.PI*(i+0.1))*size, y+Math.sin(Math.PI*(i+0.1))*size,
                x, y
            )
        }

        return circlePositions
    }
    createLineProgram() {

    }
    draw() {
        //gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Clear the canvas
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(this.circleProgram)

        gl.enableVertexAttribArray(this.circlePositionAttribLocation);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.circlePositionBuffer)

        
        gl.vertexAttribPointer(this.circlePositionAttribLocation, 2, gl.FLOAT, false, 0, 0)

        


        for(let dot of hexagonGrid.dots) {
            this.drawDot(dot)
        }
    }
    drawDot(dot) {
        let range = 1
        let rgb = this.hslToRgb((dot.height*range+range)/2, 1, 0.5)
        //console.log((dot.height*range+range)/2, rgb)
        gl.uniform4f(this.circleColorUniformLocation, rgb[0], rgb[1], rgb[2], 1);

        let positions = this.calculatePositionsCirlce(dot.vec.x, dot.vec.y, 5)


        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);


        let primitiveType = gl.TRIANGLES;
        let size = positions.length/2;
        gl.drawArrays(primitiveType, 0, size);
    }
    createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success) {
          return shader;
        }
       
        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }
    createProgram(gl, vertexShader, fragmentShader) {
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        var success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (success) {
            return program;
        }
       
        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    }
    hslToRgb(h, s, l){
        var r, g, b;
    
        if(s == 0){
            r = g = b = l; // achromatic
        }else{
            var hue2rgb = function hue2rgb(p, q, t){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }
    
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
    
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }
}
