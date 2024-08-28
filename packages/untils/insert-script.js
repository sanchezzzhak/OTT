export function insertScript(target, options = {}) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    for(let key in options) {
      script[key] = options[key];
    }
    script.addEventListener('load', () => resolve(script), false);
    script.addEventListener('error', () => resolve(null), false);
    target.appendChild(script);
  });
}

export function checkInsertScript(src) {
  return (
    src &&
    Array.from(document.getElementsByTagName('script')).some(
      (script) => script.src === src
    )
  );
}
