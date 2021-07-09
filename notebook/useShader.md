## 0709更新 使用简单的vs和fs，画正方形,主要学习shader创建、运行

#### 首先创建shader,上传源码并编译

```typescript
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
```

#### 使用shader初始化着色器程序 

```typescript
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
```

#### 查找attrib和uniform位置,和shaderProgram捆绑在一起：

```typescript
gl.getUniformLocation(result.glShaderProgram, shaderLocations.uniforms[i])
gl.getAttribLocation(result.glShaderProgram, shaderLocations.attribs[i])
```

#### 创建buffer存储正方形顶点

```typescript
  initBuffers(gl: WebGLRenderingContext) {
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    let vertices = [
      1.0, 1.0, 0.0,
      -1.0, 1.0, 0.0,
      1.0, -1.0, 0.0,
      -1.0, -1.0, 0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    return {
      position: positionBuffer
    }
  }
```

这段代码简单给出了绘画场景的本质。首先，它调用 gl 的成员函数 [`createBuffer()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/createBuffer) 得到了缓冲对象并存储在顶点缓冲器。然后调用 [`bindBuffer()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/bindBuffer) 函数绑定上下文。

当上一步完成，我们创建一个Javascript 数组去记录每一个正方体的每一个顶点。然后将其转化为 WebGL 浮点型类型的数组，并将其传到 gl 对象的 [`bufferData()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/bufferData) 方法来建立对象的顶点。

#### 绘制

使用``glmatrix``库，创建mvp变换矩阵，传入attrib和uniform位置

```typescript
    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    {
      const numComponents = 3;  // pull out 3 values per iteration
      const type = gl.FLOAT;    // the data in the buffer is 32bit floats
      const normalize = false;  // don't normalize
      const stride = 0;         // how many bytes to get from one set of values to the next
      // 0 = use type and numComponents above
      const offset = 0;         // how many bytes inside the buffer to start from
      const buffers = new FBO().initBuffers(gl);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
              gl.vertexAttribPointer(
        this.material[0].program.attribs.aVertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
      gl.enableVertexAttribArray(
        this.material[0].program.attribs.aVertexPosition);
    }

    // Tell WebGL to use our program when drawing

    gl.useProgram(this.material[0].program.glShaderProgram);

    // Set the shader uniforms

    gl.uniformMatrix4fv(
      this.material[0].program.uniforms.uProjectionMatrix,
      false,
      projectionMatrix);
    gl.uniformMatrix4fv(
      this.material[0].program.uniforms.uModelViewMatrix,
      false,
      modelViewMatrix);

    const offset = 0;
    const vertexCount = 4;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
```

