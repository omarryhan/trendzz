// https://github.com/huchenme/github-trending-api

export const createQueryURL = (language: string | undefined, since: string | undefined): string => {
  let baseUrl = 'https://ghapi.huchen.dev/repositories?';
  if (language) {
    baseUrl += `language=${language}&`;
  }
  if (since) {
    baseUrl += `since=${since}`;
  }
  return baseUrl;
};

interface Option {
  url: string;
  name: string;
}

export interface Options {
  [key: string]: Option;
}

export const languages: Options = {
  all: {
    url: '',
    name: 'All',
  },
  c: {
    url: 'c',
    name: 'C',
  },
  cSharp: {
    url: 'c%23',
    name: 'C#',
  },
  cpp: {
    url: 'c%2B%2B',
    name: 'C++',
  },
  clojure: {
    url: 'clojure',
    name: 'Clojure',
  },
  css: {
    url: 'css',
    name: 'CSS',
  },
  csv: {
    url: 'csv',
    name: 'CSV',
  },
  cython: {
    url: 'cython',
    name: 'Cython',
  },
  dart: {
    url: 'dart',
    name: 'Dart',
  },
  dockerfile: {
    url: 'dockerfile',
    name: 'Dockerfile',
  },
  elixir: {
    url: 'elixir',
    name: 'Elixir',
  },
  elm: {
    url: 'elm',
    name: 'Elm',
  },
  erlang: {
    url: 'erlang',
    name: 'Erlang',
  },
  go: {
    url: 'go',
    name: 'Go',
  },
  graphql: {
    url: 'graphql',
    name: 'GraphQL',
  },
  haskell: {
    url: 'haskell',
    name: 'Haskell',
  },
  html: {
    url: 'html',
    name: 'HTML',
  },
  htmlAndDjango: {
    url: 'html%2Bdjango',
    name: 'HTML + Django',
  },
  htmlAndPHP: {
    url: 'html%2Bphp',
    name: 'HTML + PHP',
  },
  java: {
    url: 'java',
    name: 'Java',
  },
  javascript: {
    url: 'javascript',
    name: 'Javascript',
  },
  json: {
    url: 'json',
    name: 'JSON',
  },
  julia: {
    url: 'julia',
    name: 'Julia',
  },
  jupyterNotebook: {
    url: 'jupyter-notebook',
    name: 'Jupyter Notebook',
  },
  kotlin: {
    url: 'kotlin',
    name: 'Kotlin',
  },
  lua: {
    url: 'lua',
    name: 'Lua',
  },
  markdown: {
    url: 'markdown',
    name: 'Markdown',
  },
  matlab: {
    url: 'matlab',
    name: 'Matlab',
  },
  nginx: {
    url: 'nginx',
    name: 'Nginx',
  },
  numpy: {
    url: 'numpy',
    name: 'Numpy',
  },
  objectiveC: {
    url: 'objective-c',
    name: 'Objective C',
  },
  pascal: {
    url: 'pascal',
    name: 'Pascal',
  },
  perl: {
    url: 'perl',
    name: 'Perl',
  },
  php: {
    url: 'php',
    name: 'PHP',
  },
  powershell: {
    url: 'powershell',
    name: 'Powershell',
  },
  prolog: {
    url: 'prolog',
    name: 'Prolog',
  },
  python: {
    url: 'python',
    name: 'Python',
  },
  ruby: {
    url: 'ruby',
    name: 'Ruby',
  },
  rust: {
    url: 'rust',
    name: 'Rust',
  },
  scala: {
    url: 'scala',
    name: 'Scala',
  },
  shell: {
    url: 'shell',
    name: 'Shell',
  },
  swift: {
    url: 'swift',
    name: 'Swift',
  },
  typescript: {
    url: 'typescript',
    name: 'Typescript',
  },
  vue: {
    url: 'vue',
    name: 'Vue',
  },
  webassembly: {
    url: 'webassembly',
    name: 'WebAssembly',
  },
  xml: {
    url: 'xml',
    name: 'XML',
  },
};

export const times: Options = {
  daily: {
    name: 'Today',
    url: 'daily',
  },
  weekly: {
    name: 'This Week',
    url: 'weekly',
  },
  monthly: {
    name: 'This Month',
    url: 'monthly',
  },
};
