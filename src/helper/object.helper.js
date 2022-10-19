function deepClone(object) {
  return JSON.parse(JSON.stringify(object));
}

function isEmpty(obj) {
  if (!obj) {
    return true;
  }

  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}

function isAnObject(obj) {
  return typeof obj === 'object' && obj !== null;
}
export const objectHelper = {
  deepClone,
  isEmpty,
  isAnObject
};
