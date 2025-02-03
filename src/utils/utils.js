export const keyBy = (array, key) => {
  return array.reduce((acc, obj) => {
    if (obj[key] !== undefined) {
      acc[obj[key]] = obj;
    }
    return acc;
  }, {});
};