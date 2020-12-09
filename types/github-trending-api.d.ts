declare module '@huchenme/github-trending' {
  interface FetchRepositoriesOptions {
    language: string;
    since: string;
  }

  interface BuiltBy {
    username: string;
    href: string;
    avatar: string;
  }

  interface Repository {
    author: string;
    name: string;
    avatar: string;
    url: string;
    description: string;
    language: string;
    languageColor: string;
    stars: number;
    forks: number;
    currentPeriodStars: number;
    builtBy: BuiltBy[];
  }

  export function fetchRepositories(opts: FetchRepositoriesOptions): Promise<Repo[]>;
}
