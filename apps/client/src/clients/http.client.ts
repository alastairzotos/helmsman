import { getEnv } from '@/utils/env';
import { createHttpClient } from '@bitmetro/http-client';
import { getAccessToken } from '@bitmetro/auth-react';

export const httpClient = createHttpClient(getEnv().apiUrl + '/api/v1', getAccessToken);
