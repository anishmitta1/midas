import lodashIsNumber from 'lodash/isNumber';
import lodashToNumber from 'lodash/toNumber';
import lodashIsNaN from 'lodash/isNaN';
// TODO: Figure out a better aliases to import these.

const toNumber = (number: string | number): number => {
  return lodashToNumber(number);
};

const isNumber = (value: number | string): boolean => {
  const number = toNumber(value);

  // JS is weird.
  if (lodashIsNaN(number)) {
    return false;
  }

  return lodashIsNumber(number);
};

const nextNumber = (number: number): number => {
  return (number += 1);
};

export { isNumber, nextNumber, toNumber };
