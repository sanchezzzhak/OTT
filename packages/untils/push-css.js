import {add} from './index';

/**
 * @param {HTMLElement} el
 * @param id
 * @param styles
 * @param remove
 */
export default function pushCSS(el, id, styles, remove = false) {
  let style = document.querySelector('#' + id);

  if (remove && style) {
    style.remove();
    style = null;
  }

  if (!style) {
    style = document.createElement('style');
    style.id = id;
  }
  if (style.styleSheet) {
    style.styleSheet.cssText += styles;
  } else {
    style.appendChild(document.createTextNode(styles));
  }
  add(el, style);
}