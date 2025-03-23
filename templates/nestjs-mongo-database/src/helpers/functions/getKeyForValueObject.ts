const getKeyForValueObject = (object: any, value: any) => {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      if (object[key] === value) return key;
    }
  }
};
export default getKeyForValueObject;
