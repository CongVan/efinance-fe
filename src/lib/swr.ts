import useSWR from 'swr';

import { ApiClient } from './request';

export function ApiMiddleware(useSWRNext) {
  return (key, fetcher, config) => {
    // Before hook runs...
    const [url, ...params] = key;

    // Handle the next middleware, or the `useSWR` hook if this is the last one.
    const swr = useSWRNext(key, () => fetcher(params ? params[0] : null), config);

    // After hook runs...
    return swr;
  };
}
