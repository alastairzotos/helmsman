type UrlFn = (...args: any[]) => string;

interface Urls {
  [key: string]: UrlFn | Urls;
}

export const urls = {
  home: () => '/',
  register: () => '/register',
  login: () => '/login',
  projects: {
    home: () => '/projects',
    create: () => '/projects/create',
    project: (id: string) => `/projects/${id}`,
  }
} satisfies Urls;
