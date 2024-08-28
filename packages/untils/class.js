/**
 * @param {HTMLElement} el
 * @param {string} className
 * @returns {*|boolean}
 */
export function hasClass(el, className) {
  return el instanceof Element && el.classList.contains(className);
}

/**
 * @param {HTMLElement} el
 * @param {string|Array} classes
 */
export function addClass(el, classes) {
  const addClasses = Array.isArray(classes) ? classes : classes.split(' ');
  addClasses.forEach((key) => {
    if (!el.classList.contains(key)) {
      el.classList.add(key);
    }
  });
}

/**
 * @param {HTMLElement} el
 * @param {string} className
 * @param {boolean} toggleTo
 */
export function toggleClass(el, className, toggleTo) {
  const hasIt = hasClass(el, className);
  toggleTo = typeof toggleTo === 'boolean' ? toggleTo : !hasIt;

  // short circuit if nothing to do
  if (toggleTo === hasIt) {
    return;
  }
  if (toggleTo) {
    addClass(el, className);
  } else {
    removeClass(el, className);
  }
}

/**
 * @param {HTMLElement} el
 * @param {string|Array} classes
 */
export function removeClass(el, classes) {
  const removeClasses = Array.isArray(classes) ? classes : classes.split(' ');
  removeClasses.forEach((key) => {
    if (el.classList.contains(key)) {
      el.classList.remove(key);
    }
  });
}