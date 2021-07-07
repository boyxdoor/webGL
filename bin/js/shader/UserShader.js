export class UserShader {
    constructor(gl, vsSource, fsSource, shaderLocations) {
        this.gl = gl;
        const vs = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
        const fs = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
        this.program = this.addShaderLocations({
            glShaderProgram: this.linkShader(vs, fs)
        }, shaderLocations);
    }
    linkShader(vs, fs) {
        const gl = this.gl;
        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vs);
        gl.attachShader(shaderProgram, fs);
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
            console.error(source);
            console.error('Compile shader failed:\n' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }
    addShaderLocations(result, shaderLocations) {
        const gl = this.gl;
        result.uniforms = {};
        result.attribs = {};
        if (shaderLocations && shaderLocations.uniforms && shaderLocations.uniforms.length) {
            for (let i = 0; i < shaderLocations.uniforms.length; ++i) {
                result.uniforms = Object.assign(result.uniforms, {
                    [shaderLocations.uniforms[i]]: gl.getUniformLocation(result.glShaderProgram, shaderLocations.uniforms[i]),
                });
                //console.log(gl.getUniformLocation(result.glShaderProgram, 'uKd'));
            }
        }
        if (shaderLocations && shaderLocations.attribs && shaderLocations.attribs.length) {
            for (let i = 0; i < shaderLocations.attribs.length; ++i) {
                result.attribs = Object.assign(result.attribs, {
                    [shaderLocations.attribs[i]]: gl.getAttribLocation(result.glShaderProgram, shaderLocations.attribs[i]),
                });
            }
        }
        return result;
    }
}
//# sourceMappingURL=UserShader.js.map