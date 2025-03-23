import { randomInt } from '@/imports';

const digits = '0123456789';
const lowerCaseAlphabets = 'abcdefghijklmnopqrstuvwxyz';
const upperCaseAlphabets = lowerCaseAlphabets.toUpperCase();
const specialChars = '#!&@';

interface GenerateOptions {
  digits?: boolean;
  lowerCaseAlphabets?: boolean;
  upperCaseAlphabets?: boolean;
  specialChars?: boolean;
}
const checkObj = (object: object, key: string) => {
  return Object.prototype.hasOwnProperty.call(object, key);
};

const generateOtp = (length: number, options?: GenerateOptions): string => {
  length = length || 10;
  const generateOptions: GenerateOptions = options || {};

  generateOptions.digits = checkObj(generateOptions, 'digits')
    ? options!.digits
    : true;
  generateOptions.lowerCaseAlphabets = checkObj(
    generateOptions,
    'lowerCaseAlphabets',
  )
    ? options!.lowerCaseAlphabets
    : true;
  generateOptions.upperCaseAlphabets = checkObj(
    generateOptions,
    'upperCaseAlphabets',
  )
    ? options!.upperCaseAlphabets
    : true;
  generateOptions.specialChars = checkObj(generateOptions, 'specialChars')
    ? options!.specialChars
    : true;

  const allowsChars =
    ((generateOptions.digits || '') && digits) +
    ((generateOptions.lowerCaseAlphabets || '') && lowerCaseAlphabets) +
    ((generateOptions.upperCaseAlphabets || '') && upperCaseAlphabets) +
    ((generateOptions.specialChars || '') && specialChars);

  let password = '';
  while (password.length < length) {
    const charIndex = randomInt(0, allowsChars.length);
    if (
      password.length === 0 &&
      generateOptions.digits === true &&
      allowsChars[charIndex] === '0'
    ) {
      continue;
    }
    password += allowsChars[charIndex];
  }
  return password;
};
export default generateOtp;
