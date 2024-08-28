const appName = navigator.appName;
const ua = navigator.userAgent;

const isIE = /* @cc_on!@ */ false || !!document.documentMode;
const isEdge = ua.includes('Edge');
const isWebkit =
  'WebkitAppearance' in document.documentElement.style && !/Edge/.test(ua);

const PATTERN_IPHONE = /iP(hone|od)/gi;
const PATTERN_IOS = /iP(hone|od|ad)/gi;

const isIPhone =
  PATTERN_IPHONE.test(ua) ||
  (!!navigator.platform && PATTERN_IPHONE.test(navigator.platform));

const isIos =
  PATTERN_IOS.test(ua) ||
  (navigator.platform === 'MacIntel' &&
    navigator.maxTouchPoints > 1 &&
    !window.MSStream) ||
  (!!navigator.platform && PATTERN_IOS.test(navigator.platform));

const isAndroid = /android/i.test(ua);
const isSafari = /safari/i.test(ua);
const isMobile = isIos || isAndroid;

export default {
  isIE,
  isEdge,
  isWebkit,
  isIPhone,
  isIos,
  isAndroid,
  isMobile,
  isSafari,
};
