class Renderer {
    constructor() {
        this.createCircleProgram()
        this.createLineProgram()
    }
    createLineProgram() {
        const lineVertexShader = this.createShader(gl, gl.VERTEX_SHADER, lineVertexShaderSource)
        const lineFragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, lineFragmentShaderSource)

        this.lineProgram = this.createProgram(gl, lineVertexShader, lineFragmentShader)

        this.linePositionAttribLocation = gl.getAttribLocation(this.lineProgram, "a_position")
        this.lineColorAttribLocation = gl.getAttribLocation(this.lineProgram, "a_color")

        this.lineResolutionUniformLocation = gl.getUniformLocation(this.lineProgram, "u_resolution");

        gl.useProgram(this.lineProgram)
        gl.uniform2f(this.lineResolutionUniformLocation, gl.canvas.width, gl.canvas.height)

        this.linePositionBuffer = gl.createBuffer()
        this.lineColorBuffer = gl.createBuffer()

        let positions = this.getLinePositions()
        //console.log(positions)
        gl.bindBuffer(gl.ARRAY_BUFFER, this.linePositionBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);



    }
    createCircleProgram() {

        const cirlceVertexShader = this.createShader(gl, gl.VERTEX_SHADER, circleVertexShaderSource);
        const circleFragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, circleFragmentShaderSource);

        this.circleProgram = this.createProgram(gl, cirlceVertexShader, circleFragmentShader);

        this.circlePositionAttribLocation = gl.getAttribLocation(this.circleProgram, "a_position")

        this.circleResolutionUniformLocation = gl.getUniformLocation(this.circleProgram, "u_resolution");
        this.circleColorUniformLocation = gl.getUniformLocation(this.circleProgram, "u_color");
        this.circleTranslationUniformLocation = gl.getUniformLocation(this.circleProgram, "u_translation");


        gl.useProgram(this.circleProgram)
        gl.uniform2f(this.circleResolutionUniformLocation, gl.canvas.width, gl.canvas.height)

        this.circlePositionBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.circlePositionBuffer);

        gl.enableVertexAttribArray(this.circlePositionAttribLocation);
        gl.vertexAttribPointer(this.circlePositionAttribLocation, 2, gl.FLOAT, false, 0, 0)

        this.circlePositions = this.calculatePositionsCirlce(0, 0, 5)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.circlePositions), gl.STATIC_DRAW);
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
    getLineColors() {
        let colors = []

        for(let line of hexagonGrid.lines) {
            let color0 = this.getColor(line.dot0.height)
            let color1 = this.getColor(line.dot1.height)

            colors.push(
                color0[0], color0[1], color0[2], color0[3],
                color0[0], color0[1], color0[2], color0[3],
                color1[0], color1[1], color1[2], color1[3], 
                
                
                color1[0], color1[1], color1[2], color1[3], 
                color1[0], color1[1], color1[2], color1[3],
                color0[0], color0[1], color0[2], color0[3]
            )

        }
        return colors
    }
    getLinePositions() {
        let positions = []

        for(let line of hexagonGrid.lines) {
            let rot = this.getLineSlope(line.dot0.vec, line.dot1.vec)
            let [vec0, vec1] = this.getExtrudedPoints(line.dot0.vec, rot, 1.5)
            let [vec2, vec3] = this.getExtrudedPoints(line.dot1.vec, rot, 1.5)

            positions.push(
                vec0.x, vec0.y, 
                vec1.x, vec1.y, 
                vec2.x, vec2.y, 

                vec3.x, vec3.y, 
                vec2.x, vec2.y, 
                vec1.x, vec1.y)
        }

        return positions
    }
    getLineSlope(vec0, vec1) {
        return Math.atan((vec1.y-vec0.y)/(vec1.x-vec0.x))
    }
    getExtrudedPoints(vec, rot, length) {
        let newRot = rot + Math.PI/2

        let offset = new Vec2(
            Math.cos(newRot)*length,
            Math.sin(newRot)*length
        )

        return [vec.add(offset), vec.add(offset.mult(-1))]
    }
    draw() {
        //gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Clear the canvas
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        this.drawLines()

        this.drawDots()
        
    }
    drawDots() {
        // DOTS
        gl.useProgram(this.circleProgram)

        gl.bindBuffer(gl.ARRAY_BUFFER, this.circlePositionBuffer);

        gl.enableVertexAttribArray(this.circlePositionAttribLocation);
        gl.vertexAttribPointer(this.circlePositionAttribLocation, 2, gl.FLOAT, false, 0, 0)

        for(let dot of hexagonGrid.dots) {
            this.drawDot(dot)
        }
    }
    drawLines() {
        gl.useProgram(this.lineProgram)

        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.linePositionBuffer)
        gl.enableVertexAttribArray(this.linePositionAttribLocation)
        gl.vertexAttribPointer(this.linePositionAttribLocation, 2, gl.FLOAT, false, 0, 0)
       
        let colors = this.getLineColors()

        gl.bindBuffer(gl.ARRAY_BUFFER, this.lineColorBuffer)
        gl.enableVertexAttribArray(this.lineColorAttribLocation)
        gl.vertexAttribPointer(this.lineColorAttribLocation, 4, gl.FLOAT, false, 0, 0)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

        let primitiveType = gl.TRIANGLES;
        let size = colors.length/4;
        gl.drawArrays(primitiveType, 0, size);


    }
    drawDot(dot) {
        let rgb = this.getColor(dot.height)
       // console.log((dot.height*range+range)/2/360, rgb)

        gl.uniform4f(this.circleColorUniformLocation, rgb[0], rgb[1], rgb[2], rgb[3]);

        gl.uniform2f(this.circleTranslationUniformLocation, dot.vec.x, dot.vec.y);

        let primitiveType = gl.TRIANGLES;
        let size = this.circlePositions.length/2;
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
    getColor(height) {
        let offset = 0.7
        let range = 0
        let rgb = this.hslToRgb((height*range+range)/2+offset, 1, (height+1)/4)
        return [rgb[0], rgb[1], rgb[2], 1]
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
    
        return [r, g, b];
    }
}
