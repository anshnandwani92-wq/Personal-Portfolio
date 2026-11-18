const vertexShader = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  varying vec2 v_uv;
  uniform vec2 u_resolution;
  uniform vec2 u_pointer;
  uniform vec3 u_blue;
  uniform vec3 u_teal;
  uniform vec3 u_warm;
  uniform float u_strength;
  void main() {
    vec2 aspect = vec2(u_resolution.x / max(u_resolution.y, 1.0), 1.0);
    vec2 position = (v_uv - 0.5) * aspect;
    vec2 pointer = (u_pointer - 0.5) * aspect;
    float upperField = exp(-length(position - vec2(-0.3, 0.2)) * 2.5);
    float lowerField = exp(-length(position - vec2(0.32, -0.28)) * 2.2);
    float pointerField = exp(-length(position - pointer) * 3.7);
    float tealMix = clamp(lowerField * 0.62 + pointerField * 0.6, 0.0, 0.84);
    float warmMix = clamp(upperField * 0.5 + pointerField * 0.12, 0.0, 0.5);
    vec3 color = mix(u_blue, u_teal, tealMix);
    color = mix(color, u_warm, warmMix);
    float alpha = u_strength * clamp(upperField * 0.55 + lowerField * 0.5 + pointerField * 0.68, 0.0, 1.0);
    gl_FragColor = vec4(color, alpha);
  }
`;

type Palette = { blue: [number, number, number]; teal: [number, number, number]; warm: [number, number, number]; strength: number };

const palettes: Record<string, Palette> = {
  dark: { blue: [0.16, 0.37, 0.88], teal: [0.06, 0.52, 0.5], warm: [0.68, 0.3, 0.16], strength: 0.23 },
  light: { blue: [0.22, 0.43, 0.88], teal: [0.13, 0.54, 0.48], warm: [0.76, 0.37, 0.21], strength: 0.16 },
};

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function mountAmbientShader() {
  const canvas = document.querySelector<HTMLCanvasElement>('[data-ambient-shader]');
  if (!canvas) return;

  const gl = canvas.getContext('webgl', {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'low-power',
    premultipliedAlpha: false,
  });
  if (!gl) {
    document.documentElement.dataset.shaderFallback = 'true';
    return;
  }

  const vertex = compile(gl, gl.VERTEX_SHADER, vertexShader);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentShader);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) {
    document.documentElement.dataset.shaderFallback = 'true';
    return;
  }

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    document.documentElement.dataset.shaderFallback = 'true';
    return;
  }

  const positionLocation = gl.getAttribLocation(program, 'a_position');
  const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
  const pointerLocation = gl.getUniformLocation(program, 'u_pointer');
  const blueLocation = gl.getUniformLocation(program, 'u_blue');
  const tealLocation = gl.getUniformLocation(program, 'u_teal');
  const warmLocation = gl.getUniformLocation(program, 'u_warm');
  const strengthLocation = gl.getUniformLocation(program, 'u_strength');
  const buffer = gl.createBuffer();
  if (positionLocation < 0 || !resolutionLocation || !pointerLocation || !blueLocation || !tealLocation || !warmLocation || !strengthLocation || !buffer) {
    document.documentElement.dataset.shaderFallback = 'true';
    return;
  }

  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  gl.clearColor(0, 0, 0, 0);

  let pointerX = 0.5;
  let pointerY = 0.5;
  let targetX = pointerX;
  let targetY = pointerY;
  let frame = 0;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const applyPalette = () => {
    const palette = palettes[document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'];
    gl.uniform3fv(blueLocation, palette.blue);
    gl.uniform3fv(tealLocation, palette.teal);
    gl.uniform3fv(warmLocation, palette.warm);
    gl.uniform1f(strengthLocation, palette.strength);
    scheduleDraw();
  };

  const resize = () => {
    // Render below device pixel resolution to keep this full-screen effect inexpensive.
    const width = Math.max(1, Math.round(window.innerWidth * 0.48));
    const height = Math.max(1, Math.round(window.innerHeight * 0.48));
    if (canvas.width === width && canvas.height === height) return;
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);
    scheduleDraw();
  };

  const draw = () => {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    gl.uniform2f(pointerLocation, pointerX, pointerY);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  const renderPointer = () => {
    frame = 0;
    pointerX += (targetX - pointerX) * 0.22;
    pointerY += (targetY - pointerY) * 0.22;
    draw();
    if (Math.abs(targetX - pointerX) + Math.abs(targetY - pointerY) > 0.0015) frame = window.requestAnimationFrame(renderPointer);
  };

  function scheduleDraw() {
    if (!frame) frame = window.requestAnimationFrame(renderPointer);
  }

  applyPalette();
  resize();
  draw();
  window.addEventListener('resize', resize, { passive: true });

  if (finePointer && !reducedMotion) {
    window.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      targetX = event.clientX / Math.max(window.innerWidth, 1);
      targetY = 1 - event.clientY / Math.max(window.innerHeight, 1);
      scheduleDraw();
    }, { passive: true });
    window.addEventListener('pointerleave', () => {
      targetX = 0.5;
      targetY = 0.5;
      scheduleDraw();
    }, { passive: true });
  }

  new MutationObserver(applyPalette).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
}
