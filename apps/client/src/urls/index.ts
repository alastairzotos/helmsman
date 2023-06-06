type UrlFn = (...args: any[]) => string;

interface Urls {
  [key: string]: UrlFn | Urls;
}

export const urls = {
  home: () => '/',
  login: (fwd: string) => `/login?fwd=${encodeURIComponent(fwd)}`,
  config: {
    home: () => '/config',
  },
  projects: {
    home: () => '/projects',
    create: () => '/projects/create',
    project: (id: string) => `/projects/${id}`,
  },
  apiKeys: {
    home: () => '/api-keys',
  },
} satisfies Urls;
