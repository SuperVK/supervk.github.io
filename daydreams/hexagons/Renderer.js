class Renderer {
    constructor() {
      


        // const vao = gl.createVertexArray();

        // gl.bindVertexArray(vao);

        // gl.enableVertexAttribArray(positionAttributeLocation);
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

        this.circlePositionAttribLocation = gl.getAttribLocation(this.circleProgram, "a_position");
        this.circleColorAttribLocation = gl.getAttribLocation(this.circleProgram, "a_color")
        this.circleColorAttribTranslation = gl.getAttribLocation(this.cirlceProgram, "a_translation")

        this.positionBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);


        // three 2d points
        const positions = [
            0, 0,
            0, 0.5,
            0.7, 0,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    }
    calculatePositionCirlce(x, y) {
        let circlePositions = []

        for(let i = 0; i < 50; i += 0.01) {
            circlePositions.push([
                x+Math.cos(Math.PI*i), y+Math.sin(Math.PI*i),
                x+Math.cos(Math.PI*(i+0.01)), y+Math.sin(Math.PI*(i+0.01)),
                x, y
            ])
        }
    }
    createLineProgram() {

    }
    draw() {
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Clear the canvas
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(this.program)

        gl.enableVertexAttribArray(this.positionAttributeLocation);

        
        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        let size = 2;          // 2 components per iteration
        let type = gl.FLOAT;   // the data is 32bit floats
        let normalize = false; // don't normalize the data
        let stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        let offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(this.positionAttributeLocation, size, type, normalize, stride, offset)
        
        let primitiveType = gl.TRIANGLES;
        let count = 3;
        gl.drawArrays(primitiveType, offset, count);
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
}
