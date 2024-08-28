/**
 * @param{HTMLElement} el
 */
export function isHidden(el) {
  return window.getComputedStyle(el).display === 'none';
}

/**
 * @param {HTMLElement} el
 */
export function hide(el) {
  if (!el.dataset.prevDisplay) {
    el.dataset.prevDisplay = el.style.display;
  }
  el.style.display = 'none';
}
/**
 * @param el
 */
export function show(el) {
  if (!isHidden(el)) {
    return;
  }
  let old=  el.dataset.prevDisplay;
  el.style.display = old || '';
}


export function visibility(el, toggle) {
  el.style.visibility = toggle ? 'visible' : 'hidden';
}