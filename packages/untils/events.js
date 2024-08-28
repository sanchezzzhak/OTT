// Check for passive event listener support
// https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
// https://www.youtube.com/watch?v=NPM6172J22g
const supportsPassiveListeners = (() => {
  // Test via a getter in the options object to see if the passive property is accessed
  let supported = false;
  try {
    const options = Object.defineProperty({}, 'passive', {
      get() {
        supported = true;
        return null;
      },
    });
    window.addEventListener('test', null, options);
    window.removeEventListener('test', null, options);
  } catch (e) {
    // Do nothing
  }

  return supported;
})();

/**
 * Toggle events
 * @param element
 * @param event
 * @param callback
 * @param toggle
 * @param passive
 * @param capture
 */
export function toggleListener(
  element,
  event,
  callback,
  toggle = false,
  passive = true,
  capture = false
) {
  // Bail if no element, event, or callback
  if (
    !element ||
    !('addEventListener' in element) ||
    !callback instanceof Function
  ) {
    return;
  }

  if (this && !this.eventListeners) {
    this.eventListeners = [];
  }

  // Allow multiple events
  const events = event.split(' ');

  // Build options
  // Default to just the capture boolean for browsers with no passive listener support
  let options = capture;

  // If passive events listeners are supported
  if (supportsPassiveListeners) {
    options = {
      // Whether the listener can be passive (i.e. default never prevented)
      passive,
      // Whether the listener is a capturing listener or not
      capture,
    };
  }

  // If a single node is passed, bind the event listener
  events.forEach((type) => {
    if (this && this.eventListeners && toggle) {
      // Cache event listener
      this.eventListeners.push({ element, type, callback, options });
    }

    element[toggle ? 'addEventListener' : 'removeEventListener'](
      type,
      callback,
      options
    );
  });
}

/**
 * Bind event handler
 * @param element
 * @param events
 * @param callback
 * @param passive
 * @param capture
 */
export function on(
  element,
  events = '',
  callback,
  passive = true,
  capture = false
) {
  toggleListener.call(this, element, events, callback, true, passive, capture);
}

/**
 * Unbind event handler
 * @param element
 * @param events
 * @param callback
 * @param passive
 * @param capture
 */
export function off(
  element,
  events = '',
  callback,
  passive = true,
  capture = false
) {
  toggleListener.call(this, element, events, callback, false, passive, capture);
}

/**
 * Bind once-only event handler
 * @param element
 * @param events
 * @param callback
 * @param passive
 * @param capture
 */
export function once(
  element,
  events = '',
  callback,
  passive = true,
  capture = false
) {
  const onceCallback = (...args) => {
    off(element, events, onceCallback, passive, capture);
    callback.apply(this, args);
  };

  toggleListener.call(
    this,
    element,
    events,
    onceCallback,
    true,
    passive,
    capture
  );
}

/**
 * Trigger event
 * @param element
 * @param type
 * @param bubbles
 * @param detail
 */
export function triggerEvent(element, type = '', bubbles = false, detail = {}) {
  if (!element instanceof Element || type === '') {
    return;
  }

  const event = new CustomEvent(type, {
    bubbles,
    detail: Object.assign({}, detail),
  });

  element.dispatchEvent(event);
}

// Unbind all cached event listeners
export function unbindListeners() {
  if (this && this.eventListeners) {
    this.eventListeners.forEach((item) => {
      const { element, type, callback, options } = item;
      element.removeEventListener(type, callback, options);
    });

    this.eventListeners = [];
  }
}
