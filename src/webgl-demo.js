main();

function main() {
    const canvas = document.querySelector('#glcanvas');
    const gl = canvas.getContext('webgl');
    if (!gl) {
        alert('Unable to initialize WebGL.');
        return;
    }
    const vsSource = `
    attribute vec4 aVertexPosition;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
  `;
    const fsSource = `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `;

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}
//  初始化着色器程序，让WebGL知道如何绘制我们的数据
function initShaderProgram(gl, vsSource, fsSource) {

}
// 创建指定类型的着色器，上传source源码并编译
function loadShader(gl, type, source) {
    const shader = gl.createShader()
}