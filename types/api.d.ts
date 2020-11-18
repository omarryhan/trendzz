interface BuiltBy {
  username: string;
  href: string;
  avatar: string;
}

interface Repo {
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
