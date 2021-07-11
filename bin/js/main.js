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
        function setSize(width, height) {
            canvas.width = width;
            canvas.height = height;
        }
        setSize(canvas.clientWidth, canvas.clientHeight);
        window.addEventListener('resize', () => setSize(canvas.clientWidth, canvas.clientHeight));
        this.init(gl);
    }
    async init(gl) {
        const vsSource = await loadShaderFromFile('../glsl/VertexShader.glsl');
        const fsSource = await loadShaderFromFile('../glsl/FragmentShader.glsl');
        const user_shader = new UserShader(gl, vsSource, fsSource, {
            uniforms: ['uProjectionMatrix', 'uModelViewMatrix'],
            attribs: ['aVertexPosition', 'aVertexColor']
        });
        const renderer = new WebGLRenderer(gl);
        renderer.addMaterial(user_shader);
        renderer.render();
    }
}
new Main();
//# sourceMappingURL=Main.js.map