declare module '@huchenme/github-trending' {
  interface FetchRepositoriesOptions {
    language: string;
    since: string;
  }
  export function fetchRepositories(opts: FetchRepositoriesOptions): Promise<Repo[]>;
}
