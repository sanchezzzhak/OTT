export const empty = (val) => {
  return (
    val === '' ||
    val === 0 ||
    val === '0' ||
    val === null ||
    val === false ||
    (val instanceof Array && val.length === 0)
  );
};

export const isset = (obj) => {
  return !(typeof obj === 'undefined');
};

export const asBoolean = (value) => {
  if (typeof value === 'string') {
    value = parseInt(value);
  }
  return Boolean(value);
};
