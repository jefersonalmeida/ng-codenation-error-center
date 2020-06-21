// import * as CryptoJS from 'crypto-js';
// import { environment } from '../../../environments/environment';

// const SECRET: string = environment.secret;

export type CollectionPredicate = (item?: any, index?: number, collection?: any[]) => boolean;

export class DeepWrapper {
  public __isDeepObject__: boolean = true;

  constructor(public data: any) {
  }
}

// export const hash = (value: string): string => CryptoJS.SHA256(value, SECRET).toString();
// export const encrypt = (value: string): string => CryptoJS.AES.encrypt(value, SECRET).toString();
// export const decrypt = (value: string): string => CryptoJS.AES.decrypt(value, SECRET).toString(CryptoJS.enc.Utf8);

export const searchInObject = (objects: object[], search: string | any, fields: any[], compare: string): any[] => {
  const res = [];
  objects.map(p => {

    let keys = [];
    keys = fields.length > 0 ? fields : Object.keys(p);
    keys.map(o => {
      if (p[o]
        && p[o].toString().toLowerCase().indexOf(search.toString().toLowerCase()) !== -1
        && !res.find(f => f[compare] === p[compare])) {
        res.push(p);
      }
    });
  });
  return res;
};

export const stringRand = (length = 10): string => {
  let result = '';
  const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charLength = char.length;
  for (let i = 0; i < length; i++) {
    result += char.charAt(Math.floor(Math.random() * charLength));
  }
  return result;
};

export const validateUUID = (value: any): boolean => {
  const uuid: RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuid.test(value);
};

export const isUndefined = (value: any): value is undefined => typeof value === 'undefined';

export const isNull = (value: any): value is null => value === null;

export const isNumber = (value: any): value is number => typeof value === 'number';

export const isNumberFinite = (value: any): value is number => isNumber(value) && isFinite(value);

// Not strict positive
export const isPositive = (value: number): boolean => value >= 0;

export const isInteger = (value: number): boolean => (value % 1) === 0;

export const isNil = (value: any): value is (null | undefined) => value === null || typeof (value) === 'undefined';

export const isString = (value: any): value is string => typeof value === 'string';

export const isObject = (value: any): boolean => typeof value === 'object';

export const isArray = (value: any): boolean => Array.isArray(value);

export const isFunction = (value: any): boolean => typeof value === 'function';

export const toDecimal = (value: number, decimal: number): number => (
  Math.round(value * Math.pow(10, decimal)) / Math.pow(10, decimal)
);

export const upperFirst = (value: string): string => value.slice(0, 1).toUpperCase() + value.slice(1);

export const createRound = (method: string): Function => {

  // <any>Math to suppress error
  const func: any = (<any>Math)[method];
  return function (value: number, precision: number = 0) {

    if (typeof value === 'string') {
      throw new TypeError('Rounding method needs a number');
    }

    if (typeof precision !== 'number' || isNaN(precision)) {
      precision = 0;
    }

    if (precision) {

      let pair = `${value}e`.split('e');
      const val = func(`${pair[0]}e` + (+pair[1] + precision));

      pair = `${val}e`.split('e');
      return +(pair[0] + 'e' + (+pair[1] - precision));
    }

    return func(value);
  };
};

export const leftPad = (str: string, len: number = 0, ch: any = ' ') => {

  str = String(str);
  ch = toString(ch);
  let i = -1;
  const length = len - str.length;

  while (++i < length && (str.length + ch.length) <= len) {
    str = ch + str;
  }
  return str;
};

export const rightPad = (str: string, len: number = 0, ch: any = ' ') => {

  str = String(str);
  ch = toString(ch);

  let i = -1;
  const length = len - str.length;

  while (++i < length && (str.length + ch.length) <= len) {
    str += ch;
  }
  return str;
};

export const toString = (value: number | string) => `${value}`;

export const pad = (str: string, len: number = 0, ch: any = ' '): string => {

  str = String(str);
  ch = toString(ch);
  let i = -1;
  const length = len - str.length;


  let left = true;
  while (++i < length) {

    const l = (str.length + ch.length <= len) ? (str.length + ch.length) : (str.length + 1);

    if (left) {
      str = leftPad(str, l, ch);
    } else {
      str = rightPad(str, l, ch);
    }

    left = !left;
  }
  return str;
};

export const flatten = (input: any[], index: number = 0): any[] => {

  if (index >= input.length) {
    return input;
  }

  if (isArray(input[index])) {
    return flatten(
      input.slice(0, index).concat(input[index], input.slice(index + 1)),
      index,
    );
  }
  return flatten(input, index + 1);
};


export const getProperty = (value: { [key: string]: any }, key: string): any => {

  if (isNil(value) || !isObject(value)) {
    return undefined;
  }

  const keys: string[] = key.split('.');
  let result: any = keys && value[keys.shift()];

  Object.keys(keys).map(i => {
    if (isNil(result) || !isObject(result)) {
      return undefined;
    }
    result = result[i];
  });
  return result;
};

export const sum = (input: Array<number>, initial = 0): number => (
  input.reduce((previous: number, current: number) => previous + current, initial)
);

export const shuffle = (input: any): any => {

  if (!isArray(input)) {
    return input;
  }

  const copy = [...input];

  for (let i = copy.length; i; --i) {
    const j = Math.floor(Math.random() * i);
    const x = copy[i - 1];
    copy[i - 1] = copy[j];
    copy[j] = x;
  }
  return copy;
};

export const deepIndexOf = (collection: any[], value: any) => {

  let index = -1;
  const length = collection.length;

  while (++index < length) {
    if (deepEqual(value, collection[index])) {
      return index;
    }
  }
  return -1;
};


export const deepEqual = (a: any, b: any) => {

  if (a === b) {
    return true;
  }

  if (!(typeof a === 'object' && typeof b === 'object')) {
    return a === b;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  const hasOwn = Object.prototype.hasOwnProperty;
  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];
    if (!hasOwn.call(b, keysA[i]) || !deepEqual(a[key], b[key])) {
      return false;
    }
  }
  return true;
};

export const isDeepObject = (object: any) => object.__isDeepObject__;

export const wrapDeep = (object: any) => new DeepWrapper(object);

export const unwrapDeep = (object: any) => {

  if (isDeepObject(object)) {
    return object.data;
  }
  return object;
};

export const count = (input: any): any => {

  if (!isArray(input) && !isObject(input) && !isString(input)) {
    return input;
  }

  if (isObject(input)) {
    return Object.keys(input).map((value) => input[value]).length;
  }
  return input.length;
};

export const empty = (input: any): any => {

  if (!isArray(input)) {
    return input;
  }
  return input.length === 0;
};

export const every = (input: any, predicate: CollectionPredicate) => {

  if (!isArray(input) || !predicate) {
    return input;
  }

  let result = true;
  let i = -1;

  while (++i < input.length && result) {
    result = predicate(input[i], i, input);
  }
  return result;
};

export const takeUntil = (input: any[], predicate: CollectionPredicate) => {

  let i = -1;
  const result: any = [];
  while (++i < input.length && !predicate(input[i], i, input)) {
    result[i] = input[i];
  }

  return result;
};

export const takeWhile = (input: any[], predicate: CollectionPredicate) => {
  return takeUntil(input, (item: any, index: number, collection: any[]) => !predicate(item, index, collection));
};
