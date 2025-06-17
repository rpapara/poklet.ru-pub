import { getEnv } from './utils/env';

export const config = {
  apiBaseUrl: getEnv('VITE_API_URL'),
};
