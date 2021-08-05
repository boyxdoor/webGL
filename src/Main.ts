class Main {
  constructor() {
    const canvas: HTMLCanvasElement = document.querySelector('#glcanvas');
    canvas.width = window.screen.width;
    canvas.height = window.screen.height;
    const gl: WebGLRenderingContext = canvas.getContext('webgl');
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
  renderer: WebGLRenderer

  async init(gl: WebGLRenderingContext) {

    const vsSource = await loadShaderFromFile('../glsl/VertexShader.glsl');
    const fsSource = await loadShaderFromFile('../glsl/FragmentShader.glsl');
    const user_shader = new UserShader(gl, vsSource, fsSource, {
      uniforms: ['uProjectionMatrix', 'uModelViewMatrix'],
      attribs: ['aVertexPosition', 'aVertexColor']
    });
    const renderer = new WebGLRenderer(gl);
    renderer.addMaterial(user_shader);
    const render = (now: number) => {
      now *= 0.001;
      renderer.render(now);

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render)
  }
}
new Main();