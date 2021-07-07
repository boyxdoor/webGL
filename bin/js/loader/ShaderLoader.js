export class ShaderLoader {
    initShaderProgram(gl, vsSource, fsSource) {
        const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
        //创建着色器程序
        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            console.error('Init shader program failed:' + gl.getProgramInfoLog(shaderProgram));
            return null;
        }
        return shaderProgram;
    }
    /**
     * 创建指定类型的着色器，上传source源码并编译
     * @param gl
     * @param type
     * @param source
     */
    loadShader(gl, type, source) {
        //创建shader对象
        const shader = gl.createShader(type);
        //shader绑定source
        gl.shaderSource(shader, source);
        //compile shader
        gl.compileShader(shader);
        //check
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Compile shader failed:' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }
}
//# sourceMappingURL=ShaderLoader.js.map