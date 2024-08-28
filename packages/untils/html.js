import {sanitize, sanitizeAttr} from "./sanitize"
let parserDom;
/**
 * @oldname Dom.createHtmlElement
 * @param {string} htmlSrt
 * @param {boolean} sanitize
 * @return {ChildNode}
 */
export let htmlElement = (htmlSrt, sanitize = false) => {
  return html(htmlSrt, sanitize).firstChild;
}

/**
 * @param html
 * @param sanitary
 * @return {HTMLElement}
 */
export let html = (html, sanitary = false) => {
  if (!parserDom) {
    parserDom = new DOMParser();
  }
  let parsedElement = parserDom.parseFromString(html, 'text/html').body;
  if (sanitary) {
    sanitize(parsedElement);
    let insecureElements = parsedElement.querySelectorAll('img,svg');
    for (let i = insecureElements.length; i--; ) {
      let element = insecureElements[i];
      sanitizeAttr(element);
    }
  }
  return parsedElement;
}
