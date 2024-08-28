/**
 * Delete script nodes
 * @param el
 * @returns {*}
 */
export let sanitize = (el) => {
  const nodes = el.querySelectorAll('script,object,iframe');
  for (let i = nodes.length; i--;) {
    const node = nodes[i];
    node.parentNode.removeChild(node);
  }
  return el;
};

/**
 * Delete event handler attributes that could execute XSS JavaScript
 * @param el
 * @returns {*}
 */
export let sanitizeAttr = (el) => {
  const attributes = el.attributes;
  for (let i = attributes.length; i--;) {
    const name = attributes[i].name;
    if (/^on/.test(name)) {
      el.removeAttribute(name);
    }
  }
  return el;
};