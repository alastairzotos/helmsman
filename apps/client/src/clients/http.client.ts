import { useAuthState } from '@/plugins/user/state/auth';
import { getEnv } from '@/utils/env';
import { createHttpClient } from '@bitmetro/http-client';

export const httpClient = createHttpClient(getEnv().apiUrl + '/api/v1', () => useAuthState.getState().accessToken);
