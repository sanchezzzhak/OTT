exports.empty = function(...args) {
  return (
      args.filter((mixed) => {
        return (
            mixed === '' ||
            mixed === 0 ||
            mixed === '0' ||
            mixed === null ||
            mixed === false ||
            (Array.isArray(mixed) && mixed.length === 0)
        );
      }).length === args.length
  );
};

exports.isEmpty = function(value) {
  return value === '' || value === void 0 ||
      (Array.isArray(value) && value.length === 0) ||
      value === null ||
      (typeof value === 'object' && Object.keys(value).length === 0) ||
      (typeof value === 'string' && value.trim() === '');
};

exports.isString = function(str) {
  return typeof str === 'string' || str instanceof String;
};

exports.merge = function(param1, param2) {
  return {...param1, ...param2};
};

exports.extractObject = function(obj) {
  let [key, value] = Object.entries(obj)[0];
  return {key, value};
};

exports.replaceCallback = function(pattern, callback, string) {
  [...string.matchAll(pattern)].forEach(value => {
    string = string.replace(value[0], callback(value));
  });
  return string;
};

/**
 * @param obj
 * @param right
 * @returns {boolean}
 */
exports.instanceOf = function(obj, right) {
  return (!Array.isArray(obj) && typeof obj === 'object' && obj instanceof
      right);
};

exports.isTraversable = function(obj) {
  return Array.isArray(obj)
      || (obj !== null && ['function', 'object'].includes(typeof obj));
};

exports.isNumber = function(key) {
  return /^\d+$/.test(key);
};

exports.isset = function(obj) {
  return !(typeof obj === 'undefined' || obj === null || obj.length === 0);
};

exports.strncmp = function(str, search, pos) {
  return str.startsWith(search, pos);
};

/**
 *
 * @param {Object} obj
 * @returns {null|string}
 */
exports.className = function(obj) {
  let className = null;
  // is called class
  if (typeof obj === 'object' && obj.constructor) {
    className = obj.constructor.name;
  }
  // is static class
  if (className === null) {
    className = obj.toString().split('(' || /s+/)[0].split(' ' || /s+/)[1];
  }
  return className;
};

exports.camelize = function(text) {
  const a = text.toLowerCase().
  replace(/[-_\s.]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
  return a.substring(0, 1).toLowerCase() + a.substring(1);
};

exports.words = function(text) {
  const parts = text.replace(/((?<=\p{Ll})\p{Lu}|(?<=\p{L})\p{Lu}(?=\p{Ll}))/u,
      ' $1');
  return parts.split(/\s/).filter(val => val !== '');
};

/**
 * @param {string} text
 * @return {string}
 */
exports.ucfirst = function(text) {
  return text.charAt(0).toUpperCase() + text.substr(1);
};

exports.lcfirst = function(text) {
  return text.charAt(0).toLowerCase() + text.substr(1);
};

/**
 * compare arrays a with b and get everything in b
 * @param a
 * @param b
 * @returns {*}
 */
exports.compareArrayExist = function(a, b) {
  return a.filter((n) => b.indexOf(n) !== -1);
};
/**
 * compare arrays a with b and get everything that is not in b
 * @param a
 * @param b
 * @returns {*}
 */
exports.compareArrayNotExist = function(a, b) {
  return a.filter((n) => b.indexOf(n) === -1);
};

exports.unique = function(value, index, self) {
  return self.indexOf(value) === index;
};

exports.count = function(params) {
  return Array.isArray(params) ? params.length
      : (typeof params === 'object')
          ? Object.keys(params).length : 0;
};

/**
 * @param arr1 {Array}
 * @returns {*}
 */
exports.arrayUnique = function(arr1) {
  return arr1.filter((v, i, a) => a.indexOf(v) === i);
};

/**
 * Compare versions
 * @param ver1
 * @param ver2
 * @returns {number}
 */
exports.versionCompare = function(ver1, ver2) {
  if (ver1 === ver2) {
    return 0;
  }
  let left = ver1.split('.');
  let right = ver2.split('.');
  let len = Math.min(left.length, right.length);
  for (let i = 0; i < len; i++) {
    if (left[i] === right[i]) {
      continue;
    }
    if (parseInt(left[i]) > parseInt(right[i])) {
      return 1;
    }
    if (parseInt(left[i]) < parseInt(right[i])) {
      return -1;
    }
  }
  if (left.length > right.length) {
    return 1;
  }
  if (left.length < right.length) {
    return -1;
  }
  return 0;
};

/***
 *
 * @param {string} str
 * @param {string} charlist
 * @returns {string}
 * @description As soon as there are more functions from locutus to be used, I will think about connecting the locutus dependency
 */
exports.addcslashes = function(str, charlist) {
  //  discuss at: https://locutus.io/php/addcslashes/
  // original by: Brett Zamir (https://brett-zamir.me)
  //      note 1: We show double backslashes in the return value example
  //      note 1: code below because a JavaScript string will not
  //      note 1: render them as backslashes otherwise
  //   example 1: addcslashes('foo[ ]', 'A..z'); // Escape all ASCII within capital A to lower z range, including square brackets
  //   returns 1: "\\f\\o\\o\\[ \\]"
  //   example 2: addcslashes("zoo['.']", 'z..A'); // Only escape z, period, and A here since not a lower-to-higher range
  //   returns 2: "\\zoo['\\.']"
  //   _example 3: addcslashes("@a\u0000\u0010\u00A9", "\0..\37!@\177..\377"); // Escape as octals those specified and less than 32 (0x20) or greater than 126 (0x7E), but not otherwise
  //   _returns 3: '\\@a\\000\\020\\302\\251'
  //   _example 4: addcslashes("\u0020\u007E", "\40..\175"); // Those between 32 (0x20 or 040) and 126 (0x7E or 0176) decimal value will be backslashed if specified (not octalized)
  //   _returns 4: '\\ ~'
  //   _example 5: addcslashes("\r\u0007\n", '\0..\37'); // Recognize C escape sequences if specified
  //   _returns 5: "\\r\\a\\n"
  //   _example 6: addcslashes("\r\u0007\n", '\0'); // Do not recognize C escape sequences if not specified
  //   _returns 6: "\r\u0007\n"
  let target = '';
  const chrs = [];
  let i = 0;
  let j = 0;
  let c = '';
  let next = '';
  let rangeBegin = '';
  let rangeEnd = '';
  let chr = '';
  let begin = 0;
  let end = 0;
  let octalLength = 0;
  let postOctalPos = 0;
  let cca = 0;
  let escHexGrp = [];
  let encoded = '';
  const percentHex = /%([\dA-Fa-f]+)/g;
  const _pad = function(n, c) {
    if ((n = n + '').length < c) {
      return new Array(++c - n.length).join('0') + n;
    }
    return n;
  };
  for (i = 0; i < charlist.length; i++) {
    c = charlist.charAt(i);
    next = charlist.charAt(i + 1);
    if (c === '\\' && next && (/\d/).test(next)) {
      // Octal
      rangeBegin = charlist.slice(i + 1).match(/^\d+/)[0];
      octalLength = rangeBegin.length;
      postOctalPos = i + octalLength + 1;
      if (charlist.charAt(postOctalPos) + charlist.charAt(postOctalPos + 1) ===
          '..') {
        // Octal begins range
        begin = rangeBegin.charCodeAt(0);
        if ((/\\\d/).test(charlist.charAt(postOctalPos + 2) +
            charlist.charAt(postOctalPos + 3))) {
          // Range ends with octal
          rangeEnd = charlist.slice(postOctalPos + 3).match(/^\d+/)[0];
          // Skip range end backslash
          i += 1;
        } else if (charlist.charAt(postOctalPos + 2)) {
          // Range ends with character
          rangeEnd = charlist.charAt(postOctalPos + 2);
        } else {
          throw new Error('Range with no end point');
        }
        end = rangeEnd.charCodeAt(0);
        if (end > begin) {
          // Treat as a range
          for (j = begin; j <= end; j++) {
            chrs.push(String.fromCharCode(j));
          }
        } else {
          // Supposed to treat period, begin and end as individual characters only, not a range
          chrs.push('.', rangeBegin, rangeEnd);
        }
        // Skip dots and range end (already skipped range end backslash if present)
        i += rangeEnd.length + 2;
      } else {
        // Octal is by itself
        chr = String.fromCharCode(parseInt(rangeBegin, 8));
        chrs.push(chr);
      }
      // Skip range begin
      i += octalLength;
    } else if (next + charlist.charAt(i + 2) === '..') {
      // Character begins range
      rangeBegin = c;
      begin = rangeBegin.charCodeAt(0);
      if ((/\\\d/).test(charlist.charAt(i + 3) + charlist.charAt(i + 4))) {
        // Range ends with octal
        rangeEnd = charlist.slice(i + 4).match(/^\d+/)[0];
        // Skip range end backslash
        i += 1;
      } else if (charlist.charAt(i + 3)) {
        // Range ends with character
        rangeEnd = charlist.charAt(i + 3);
      } else {
        throw new Error('Range with no end point');
      }
      end = rangeEnd.charCodeAt(0);
      if (end > begin) {
        // Treat as a range
        for (j = begin; j <= end; j++) {
          chrs.push(String.fromCharCode(j));
        }
      } else {
        // Supposed to treat period, begin and end as individual characters only, not a range
        chrs.push('.', rangeBegin, rangeEnd);
      }
      // Skip dots and range end (already skipped range end backslash if present)
      i += rangeEnd.length + 2;
    } else {
      // Character is by itself
      chrs.push(c);
    }
  }
  for (i = 0; i < str.length; i++) {
    c = str.charAt(i);
    if (chrs.indexOf(c) !== -1) {
      target += '\\';
      cca = c.charCodeAt(0);
      if (cca < 32 || cca > 126) {
        // Needs special escaping
        switch (c) {
          case '\n':
            target += 'n';
            break;
          case '\t':
            target += 't';
            break;
          case '\u000D':
            target += 'r';
            break;
          case '\u0007':
            target += 'a';
            break;
          case '\v':
            target += 'v';
            break;
          case '\b':
            target += 'b';
            break;
          case '\f':
            target += 'f';
            break;
          default:
            // target += _pad(cca.toString(8), 3);break; // Sufficient for UTF-16
            encoded = encodeURIComponent(c);
            // 3-length-padded UTF-8 octets
            if ((escHexGrp = percentHex.exec(encoded)) !== null) {
              // already added a slash above:
              target += _pad(parseInt(escHexGrp[1], 16).toString(8), 3);
            }
            while ((escHexGrp = percentHex.exec(encoded)) !== null) {
              target += '\\' + _pad(parseInt(escHexGrp[1], 16).toString(8), 3);
            }
            break;
        }
      } else {
        // Perform regular backslashed escaping
        target += c;
      }
    } else {
      // Just add the character unescaped
      target += c;
    }
  }
  return target;
};

/**
 *
 * @param {string} str
 * @param {{}} dic
 * @returns {{val, key: *, token}}
 * @author https://gist.github.com/dsheiko/2774533
 */
exports.strtr = function(str, dic) {
  const makeToken = (inx) => `{{###~${inx}~###}}`,
      tokens = Object.keys(dic).map((key, inx) => ({
        key,
        val: dic[key],
        token: makeToken(inx),
      })),
      tokenizedStr = tokens.reduce((carry, entry) =>
          carry.replace(new RegExp(entry.key, 'g'), entry.token), str);
  return tokens.reduce((carry, entry) =>
      carry.replace(new RegExp(entry.token, 'g'), entry.val), tokenizedStr);
};

exports.bindec = function(binaryString) {
  binaryString = (binaryString + '').replace(/[^01]/gi, '');
  return parseInt(binaryString, 2);
};

exports.ksort = function(objects) {
  return Object.keys(objects).sort().reduce(function(result, key) {
    result[key] = objects[key];
    return result;
  }, {});
};

exports.splitCommaString = function(value) {
  return value.trim().split(/\s*,\s*/).filter(val => val !== '');
};