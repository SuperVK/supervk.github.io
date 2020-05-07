class Renderer {
    constructor() {
        
        
        console.log(fragmentShaderSource)

        const vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

        const program = createProgram(gl, vertexShader, fragmentShader);

        const positionAttributeLocation = gl.getAttribLocation(program, "a_position");

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);


        // three 2d points
        const positions = [
            0, 0,
            0, 0.5,
            0.7, 0,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);


        const vao = gl.createVertexArray();

        gl.bindVertexArray(vao);

        gl.enableVertexAttribArray(positionAttributeLocation);
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
}
