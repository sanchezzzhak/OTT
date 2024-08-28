
export default function DeviceCollector() {

  const isAppleFamily = /iP(ad|od|hone)|Macintosh/.exec(navigator.userAgent) !== null;
  const isSamsungBrowser = navigator.userAgent.match(/SamsungBrowser/i) !== null;

  const _WIDTH = 280;
  const _HEIGHT = 20;
  const _RUNS = isSamsungBrowser || isAppleFamily ? 1 : 3;

  const WEBGL_ERROR = 'WebGL not supported';
  let canvas;
  let gl;
  if (typeof document !== 'undefined') {
    canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 100;
    gl = canvas.getContext('webgl');
  }

  function getHints() {
    return new Promise((resolve, reject) => {
      if (!navigator.userAgentData) {
        return resolve({})
      }
      let requestHints = [
        'brands',
        'mobile',
        'platform',
        'platformVersion',
        'architecture',
        'bitness',
        'wow64',
        'model',
        'uaFullVersion',
        'fullVersionList'];

      navigator.userAgentData.getHighEntropyValues(requestHints).then((result) => {
        resolve(JSON.parse(JSON.stringify(result)))
      }).catch(() => {
        resolve({});
      });
    })
  }

  /** #################################
   *  private metrics methods
   * ################################# */

  function screenDetails() {
    return new Promise((resolve) => {
      resolve({
        'is_touchscreen': navigator.maxTouchPoints > 0,
        'maxTouchPoints': navigator.maxTouchPoints,
        'colorDepth': screen.colorDepth,
        'mediaMatches': matchMedias()
      });
    });
  }


  function matchMedias() {
    let results = [];
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries
     */
    const mediaQueries = {
      'prefers-contrast': ['high', 'more', 'low', 'less', 'forced', 'no-preference'],
      'any-hover': ['hover', 'none'],
      'any-pointer': ['none', 'coarse', 'fine'],
      'pointer': ['none', 'coarse', 'fine'],
      'hover': ['hover', 'none'],
      'update': ['fast', 'slow'],
      'inverted-colors': ['inverted', 'none'],
      'prefers-reduced-motion': ['reduce', 'no-preference'],
      'prefers-reduced-transparency': ['reduce', 'no-preference'],
      'scripting': ['none', 'initial-only', 'enabled'],
      'forced-colors': ['active', 'none']
    };
    Object.keys(mediaQueries).forEach((key) => {
      mediaQueries[key].forEach((value) => {
        if (matchMedia(`(${key}: ${value})`).matches)
          results.push(`${key}: ${value}`);
      });
    });
    return results;
  }

  const getMathInfo = () => {
    return {
      acos: Math.acos(0.5),
      asin: integrate(Math.asin, -1, 1, 97),
      atan: integrate(Math.atan, -1, 1, 97),
      cos: integrate(Math.cos, 0, Math.PI, 97),
      cosh: Math.cosh(9 / 7),
      e: Math.E,
      largeCos: Math.cos(1e20),
      largeSin: Math.sin(1e20),
      largeTan: Math.tan(1e20),
      log: Math.log(1000),
      pi: Math.PI,
      sin: integrate(Math.sin, -Math.PI, Math.PI, 97),
      sinh: integrate(Math.sinh, -9 / 7, 7 / 9, 97),
      sqrt: Math.sqrt(2),
      tan: integrate(Math.tan, 0, 2 * Math.PI, 97),
      tanh: integrate(Math.tanh, -9 / 7, 7 / 9, 97)
    };
  };

  /** This might be a little excessive, but I wasn't sure what number to pick for some of the
   * trigonometric functions. Using an integral here, so a few numbers are calculated. However,
   * I do this mainly for those integrals that sum up to a small value, otherwise there's no point.
   */
  const integrate = (f, a, b, n) => {
    const h = (b - a) / n;
    let sum = 0;
    for (let i = 0; i < n; i++) {
      const x = a + (i + 0.5) * h;
      sum += f(x);
    }
    return sum * h;
  };

  function getCommonPixels(images, width, height) {
    let finalData = [];
    for (let i = 0; i < images[0].data.length; i++) {
      let indice = [];
      for (let u = 0; u < images.length; u++) {
        indice.push(images[u].data[i]);
      }
      finalData.push(getMostFrequent(indice));
    }
    const pixelArray = new Uint8ClampedArray(finalData);
    return new ImageData(pixelArray, width, height);
  }

  function getMostFrequent(arr) {
    if (arr.length === 0) {
      return 0; // Handle empty array case
    }
    const frequencyMap = {};
    // Count occurrences of each number in the array
    for (const num of arr) {
      frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    }
    let mostFrequent = arr[0];
    // Find the number with the highest frequency
    for (const num in frequencyMap) {
      if (frequencyMap[num] > frequencyMap[mostFrequent]) {
        mostFrequent = parseInt(num, 10);
      }
    }
    return mostFrequent;
  }

  function generateCanvasImageData() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return new ImageData(1, 1);
    }
    // Set canvas dimensions
    canvas.width = 280;
    canvas.height = 20;
    // Create rainbow gradient for the background rectangle
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(1 / 6, 'orange');
    gradient.addColorStop(2 / 6, 'yellow');
    gradient.addColorStop(3 / 6, 'green');
    gradient.addColorStop(4 / 6, 'blue');
    gradient.addColorStop(5 / 6, 'indigo');
    gradient.addColorStop(1, 'violet');
    // Draw background rectangle with the rainbow gradient
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Draw some random text
    const randomText = 'Random Text DC1Mwmil10Oo';
    ctx.font = '23.123px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(randomText, -5, 15);
    // Draw the same text with an offset, different color, and slight transparency
    ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
    ctx.fillText(randomText, -3.3, 17.7);
    // Draw a line crossing the image at an arbitrary angle
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width * 2 / 7, canvas.height);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // Return data URL of the canvas
    return imageData;
  }

  function getCanvasFingerprint() {

    /**
     * Since some browsers fudge with the canvas pixels to prevent fingerprinting, the following
     * creates the canvas three times and getCommonPixels picks the most common byte for each
     * channel of each pixel.
     */
    const imageDatas = Array.from({ length: _RUNS }, () => generateCanvasImageData());
    const result = getCommonPixels(imageDatas, _WIDTH, _HEIGHT);
    return cyrb53(result.data.toString()).toString();
  }

  function getWebGLFingerprint() {
    try {
      if (!gl) {
        throw new Error(WEBGL_ERROR);
      }
      const imageDatas = Array.from({ length: _RUNS }, () => createWebGLImageData());
      // and then checking the most common bytes for each channel of each pixel
      const commonImageData = getCommonPixels(imageDatas, canvas.width, canvas.height);
      return cyrb53(commonImageData.data.toString()).toString();
    } catch (error) {
      return '';
    }
  }

  function createWebGLImageData() {
    try {
      if (!gl) {
        throw new Error(WEBGL_ERROR);
      }
      const vertexShaderSource = `
          attribute vec2 position;
          void main() {
              gl_Position = vec4(position, 0.0, 1.0);
          }
      `;
      const fragmentShaderSource = `
          precision mediump float;
          void main() {
              gl_FragColor = vec4(0.812, 0.195, 0.553, 0.921); // Set line color
          }
      `;
      const vertexShader = gl.createShader(gl.VERTEX_SHADER);
      const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      if (!vertexShader || !fragmentShader) {
        throw new Error('Failed to create shaders');
      }
      gl.shaderSource(vertexShader, vertexShaderSource);
      gl.shaderSource(fragmentShader, fragmentShaderSource);
      gl.compileShader(vertexShader);
      if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        throw new Error('Vertex shader compilation failed: ' + gl.getShaderInfoLog(vertexShader));
      }
      gl.compileShader(fragmentShader);
      if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        throw new Error('Fragment shader compilation failed: ' + gl.getShaderInfoLog(fragmentShader));
      }
      const shaderProgram = gl.createProgram();
      if (!shaderProgram) {
        throw new Error('Failed to create shader program');
      }
      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
      gl.linkProgram(shaderProgram);
      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        throw new Error('Shader program linking failed: ' + gl.getProgramInfoLog(shaderProgram));
      }
      gl.useProgram(shaderProgram);
      // Set up vertices to form lines
      const numSpokes = 137;
      const vertices = new Float32Array(numSpokes * 4);
      const angleIncrement = (2 * Math.PI) / numSpokes;
      for (let i = 0; i < numSpokes; i++) {
        const angle = i * angleIncrement;
        // Define two points for each line (spoke)
        vertices[i * 4] = 0; // Center X
        vertices[i * 4 + 1] = 0; // Center Y
        vertices[i * 4 + 2] = Math.cos(angle) * (canvas.width / 2); // Endpoint X
        vertices[i * 4 + 3] = Math.sin(angle) * (canvas.height / 2); // Endpoint Y
      }
      const vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
      const positionAttribute = gl.getAttribLocation(shaderProgram, 'position');
      gl.enableVertexAttribArray(positionAttribute);
      gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);
      // Render
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.LINES, 0, numSpokes * 2);
      const pixelData = new Uint8ClampedArray(canvas.width * canvas.height * 4);
      gl.readPixels(0, 0, canvas.width, canvas.height, gl.RGBA, gl.UNSIGNED_BYTE, pixelData);
      return new ImageData(pixelData, canvas.width, canvas.height);
    } catch (error) {
      return new ImageData(1, 1);
    } finally {
      if (gl) {
        // Reset WebGL state
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.useProgram(null);
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
      }
    }
  }

  function getHardwareInfo() {
    return new Promise((resolve, reject) => {
      const deviceMemory = (navigator.deviceMemory !== undefined) ? navigator.deviceMemory : 0;
      const memoryInfo = (window.performance && window.performance.memory) ? window.performance.memory : 0;
      resolve({
        'videocard': getVideoCard(),
        'architecture': getArchitecture(),
        'deviceMemory': deviceMemory.toString() || 'undefined',
        'jsHeapSizeLimit': memoryInfo.jsHeapSizeLimit || 0
      });
    });
  }

  /**
   * @see Credits: https://stackoverflow.com/a/49267844
   * @returns VideoCard | "undefined"
   */
  function getVideoCard() {
    var _a;
    const canvas = document.createElement('canvas');
    const gl = (_a = canvas.getContext('webgl')) !== null && _a !== void 0 ? _a : canvas.getContext('experimental-webgl');
    if (gl && 'getParameter' in gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      return {
        vendor: (gl.getParameter(gl.VENDOR) || '').toString(),
        vendorUnmasked: debugInfo ? (gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || '').toString() : '',
        renderer: (gl.getParameter(gl.RENDERER) || '').toString(),
        rendererUnmasked: debugInfo ? (gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '').toString() : '',
        version: (gl.getParameter(gl.VERSION) || '').toString(),
        shadingLanguageVersion: (gl.getParameter(gl.SHADING_LANGUAGE_VERSION) || '').toString()
      };
    }
    return 'undefined';
  }

  function getArchitecture() {
    const f = new Float32Array(1);
    const u8 = new Uint8Array(f.buffer);
    f[0] = Infinity;
    f[0] = f[0] - f[0];
    return u8[3];
  }


  /** #################################
   *  hash methods
   * ################################# */

  const cyrb53 = function(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  };

  /** #################################
   *  private helper methods
   * ################################# */

  /**
   * get gpu name
   * @returns {string|null}
   */
  function getGPUName() {
    return gl
      ? gl.getParameter(gl.getExtension(
        'WEBGL_debug_renderer_info').UNMASKED_RENDERER_WEBGL)
      : null;
  }

  /**
   * get device pixel ratio
   */
  function getRatio() {
    return window.devicePixelRatio;
  }

  /**
   * get device width of the screen in pixels
   */
  function getWidth() {
    return window.screen.width;
  }

  /**
   * get device height of the screen in pixels
   */
  function getHeight() {
    return window.screen.height;
  }

  /**
   * get device memory
   * @return {number|null}
   */
  function getDeviceMemory() {
    return navigator.deviceMemory ? navigator.deviceMemory : null;
  }

  /**
   * Determines if the query is supported by the device.
   * @param {string} query
   * @returns {boolean}
   */
  function hasMediaSupport(query) {
    return window.matchMedia(query).matches;
  }

  function getMediaValue(name, values) {
    for (let i = 0; i < values.length; i++) {
      if (hasMediaSupport('(' + name + ': ' + values[i] + ')')) {
        return values[i];
      }
    }
    return '';
  }

  function getMediaColorGamut() {
    return getMediaValue('color-gamut', ['p3', 'srgb']);
  }

  function getApplePayVersion() {
    if (window.location.protocol === 'https:' && typeof window.ApplePaySession === 'function') {
      try {
        const versionCheck = window.ApplePaySession.supportsVersion;
        for (let i = 15; i > 0; i--) {
          if (versionCheck(i)) {
            return i;
          }
        }
      } catch (e) {
      }
    }
    return 0;
  }


  /** #################################
   *  public methods
   * ################################# */

  this.info = async function() {
    let fingerPrintCanvas = getCanvasFingerprint();
    let fingerPrintWebGL = getWebGLFingerprint();
    let fingerPrintCPU = cyrb53(Object.values(getMathInfo()).join(','));
    let hints = await getHints();

    return {
      useragent: navigator.userAgent,
      applePay: getApplePayVersion(),
      arch: getArchitecture(),
      width: getWidth(),
      height: getHeight(),
      ratio: getRatio(),
      ram: getDeviceMemory(),
      gpu: getGPUName(),
      colorDepth: screen.colorDepth,
      gamut: getMediaColorGamut(),
      cores: navigator.hardwareConcurrency,
      hashG: fingerPrintWebGL,
      hashC: fingerPrintCanvas,
      hashM: fingerPrintCPU,
      hints: hints
    };
  };

}
