class UserShader {
    gl: WebGLRenderingContext
    program: user_ShaderProgram
    constructor(gl: WebGLRenderingContext, vsSource: string, fsSource: string, shaderLocations: user_ShaderLocations) {
        this.gl = gl;
        const vs = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
        const fs = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
        this.program = this.addShaderLocations({
            glShaderProgram: this.linkShader(vs, fs)
        }, shaderLocations)
    }
    linkShader(vs: WebGLShader, fs: WebGLShader) {
        const gl = this.gl;
        const shaderProgram: WebGLProgram = gl.createProgram();
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
    loadShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
        //创建shader对象
        const shader: WebGLShader = gl.createShader(type);
        //shader绑定source
        gl.shaderSource(shader, source);
        //compile shader
        gl.compileShader(shader);
        //check
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(source)
            console.error('Compile shader failed:\n' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }
    addShaderLocations(result: user_ShaderProgram, shaderLocations: user_ShaderLocations): user_ShaderProgram {
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
interface user_ShaderLocations {
    uniforms: Array<string>
    attribs: Array<string>
}

/**
 * 在创建着色器程序之后，我们需要查找WebGL返回分配的输入位置。在上述情况下，我们有一个属性和两个uniforms。属性从缓冲区接收值。顶点着色器的每次迭代都从分配给该属性的缓冲区接收下一个值。uniforms类似于JavaScript全局变量。它们在着色器的所有迭代中保持相同的值。由于属性和统一的位置是特定于单个着色器程序的，因此我们将它们存储在一起以使它们易于传递
 */
interface user_ShaderProgram {
    glShaderProgram: WebGLProgram,
    uniforms?: Record<string, WebGLUniformLocation>
    attribs?: Record<string, number>
}