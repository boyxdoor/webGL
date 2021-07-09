class WebGLRenderer {
    constructor(gl, camera) {
        this.material = [];
        this.gl = gl;
    }
    addMaterial(material) {
        this.material.push(material);
    }
    render() {
        const gl = this.gl;
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST); // Enable depth testing
        gl.depthFunc(gl.LEQUAL); // Near things obscure far things
        // Clear the canvas before we start drawing on it.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        // Create a perspective matrix, a special matrix that is
        // used to simulate the distortion of perspective in a camera.
        // Our field of view is 45 degrees, with a width/height
        // ratio that matches the display size of the canvas
        // and we only want to see objects between 0.1 units
        // and 100 units away from the camera.
        const fieldOfView = 45 * Math.PI / 180; // in radians
        const aspect = window.screen.width / window.screen.height;
        const zNear = 0.1;
        const zFar = 100.0;
        const projectionMatrix = mat4.create();
        // note: glmatrix.js always has the first argument
        // as the destination to receive the result.
        mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
        // Set the drawing position to the "identity" point, which is
        // the center of the scene.
        const modelViewMatrix = mat4.create();
        // Now move the drawing position a bit to where we want to
        // start drawing the square.
        mat4.translate(modelViewMatrix, // destination matrix
        modelViewMatrix, // matrix to translate
        [-0.0, 0.0, -6.0]); // amount to translate
        // Tell WebGL how to pull out the positions from the position
        // buffer into the vertexPosition attribute.
        {
            const numComponents = 3; // pull out 3 values per iteration
            const type = gl.FLOAT; // the data in the buffer is 32bit floats
            const normalize = false; // don't normalize
            const stride = 0; // how many bytes to get from one set of values to the next
            // 0 = use type and numComponents above
            const offset = 0; // how many bytes inside the buffer to start from
            const buffers = new FBO().initBuffers(gl);
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
            gl.vertexAttribPointer(this.material[0].program.attribs.aVertexPosition, numComponents, type, normalize, stride, offset);
            gl.enableVertexAttribArray(this.material[0].program.attribs.aVertexPosition);
        }
        // Tell WebGL to use our program when drawing
        gl.useProgram(this.material[0].program.glShaderProgram);
        // Set the shader uniforms
        gl.uniformMatrix4fv(this.material[0].program.uniforms.uProjectionMatrix, false, projectionMatrix);
        gl.uniformMatrix4fv(this.material[0].program.uniforms.uModelViewMatrix, false, modelViewMatrix);
        const offset = 0;
        const vertexCount = 4;
        gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
    }
}
//# sourceMappingURL=WebGLRenderer.js.map