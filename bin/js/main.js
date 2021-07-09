class Main {
    constructor() {
        const canvas = document.querySelector('#glcanvas');
        canvas.width = window.screen.width;
        canvas.height = window.screen.height;
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
        const user_shader = new UserShader(gl, vsSource, fsSource, {
            uniforms: ['uProjectionMatrix', 'uModelViewMatrix'],
            attribs: ['aVertexPosition']
        });
        // const programInfo = user_shader.program;
        const renderer = new WebGLRenderer(gl);
        renderer.addMaterial(user_shader);
        renderer.render();
    }
}
new Main();
//# sourceMappingURL=Main.js.map