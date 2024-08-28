import { parseStr } from './parse-str';

function buildQueryEscape(param) {
  return encodeURIComponent(param).replace(
    /[!'()*]/g,
    (x) => `%${x.charCodeAt(0).toString(16).toUpperCase()}`
  );
}

export function buildQuery(
  queryData,
  numericPrefix = null,
  argSeparator = '&',
  tempKey = null
) {
  if (queryData === null) {
    return '';
  }

  let query = Object.keys(queryData).map((k) => {
    let res;
    let key = k;
    if (tempKey) {
      key = tempKey + '[' + key + ']';
    }
    if (typeof queryData[k] === 'object') {
      res = buildQuery(queryData[k], null, argSeparator, key);
    } else {
      if (numericPrefix) {
        let isNum = !isNaN(parseFloat(key)) && isFinite(key);
        key = isNum ? numericPrefix + Number(key) : key;
      }
      if (queryData[k] !== '') {
        let val = queryData[k];
        if (val === true) {
          val = '1';
        } else if (val === false) {
          val = '0';
        }
        res = buildQueryEscape(key) + '=' + buildQueryEscape(val);
      }
    }
    return res;
  });

  query = query.filter((w) => {
    return w !== undefined;
  });
  return query.join(argSeparator).replace(/[!'()*]/g, '');
}

export function buildUrl(str, data = {}) {
  if (/(https?:\/\/|:\/\/)/i.test(str) === false) {
    str = 'http://' + str;
  }
  let parsed;
  try {
    parsed = new URL(str);
  } catch (e) {
    return str;
  }
  let params = {};
  if (parsed.search && parsed.search.length > 0) {
    params = parseStr(parsed.search.split('?')[1]);
  }
  params = Object.assign({}, data, params);
  let query = buildQuery(params);
  return (
    parsed.protocol +
    '//' +
    parsed.host +
    parsed.pathname +
    (String(query).length > 0 ? '?' + query : '')
  );
}
