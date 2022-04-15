export const mobileScreen = () => {
  return window.innerWidth <= 767;
};

export function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

export function getDataObjectFromInputs(obj) {
  const stash = {};
  obj.map(input => {
    return (stash[camelize(input.name)] = '');
  });

  return stash;
}
