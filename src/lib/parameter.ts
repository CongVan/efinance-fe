import qs from 'qs';

export const stringifyParameter = (params: object) => {
  return qs.stringify(params);
};

export const parseParameter = (params: string) => {
  return qs.parse(params);
};
