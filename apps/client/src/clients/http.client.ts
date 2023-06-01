import { getAccessToken } from '@/plugins/user';
import { getEnv } from '@/utils/env';
import { createHttpClient } from '@bitmetro/http-client';

export const httpClient = createHttpClient(getEnv().apiUrl + '/api/v1', getAccessToken);
