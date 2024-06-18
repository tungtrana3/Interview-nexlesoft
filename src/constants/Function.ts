export const objectIsNull = (object?: any) => {
  if (object === null || object === undefined || object === '(null)') {
    return true;
  } else {
    return false;
  }
};
export const arrayIsEmpty = (array?: any) => {
  if (objectIsNull(array) || array.length === 0) {
    return true;
  } else {
    return false;
  }
};
export const stringIsEmpty = (string?: string) => {
  if (objectIsNull(string) || string === '' || string === 'null') {
    return true;
  } else {
    return false;
  }
};