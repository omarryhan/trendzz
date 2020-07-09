import React from 'react';
import { createQueryURL, languages } from '../../configs';
import { Repo } from '../types';

const fetchRepos = async (
  feedLanguages: string[], setIsFetching: (state: boolean) => void,
): Promise<Repo[]> => {
  let allResults = [] as Repo[][];
  try {
    setIsFetching(true);
    allResults = await Promise.all(feedLanguages.map(async (language): Promise<Repo[]> => {
      const url = createQueryURL(languages[language].url, 'daily');
      return await (await fetch(url)).json() as Repo[];
    }));
  } catch (e) {
    alert(e.message);
    console.error(e);
  } finally {
    setIsFetching(false);
  }

  const retVal: Repo[] = [];

  for (let i = 0; i < 100; i += 1) {
    allResults.forEach((results) => {
      const repo = results[i];
      if (repo) {
        retVal.push(repo);
      }
    });
  }

  // return allResults.flat();
  return retVal;
};

interface Props {
  children: React.FC<{
    repos: Repo[];
    isFetchingRepos: boolean;
  }>;
}

const getInitialLanguages = (): string[] => {
  if (typeof window === 'undefined') {
    return ['all'];
  }

  const feedLanguages = window.localStorage.getItem('feedLanguages');

  if (!feedLanguages) {
    window.localStorage.setItem('feedLanguages', 'all');
    return ['all'];
  }

  return feedLanguages.split(',');
};

const Component: React.FC<Props> = ({ children }) => {
  const [repos, setRepos] = React.useState<Repo[]>([]);
  const [isFetchingRepos, setIsFetchingRepos] = React.useState(false);
  const feedLanguages = getInitialLanguages();

  React.useEffect(() => {
    const effect = async (): Promise<void> => {
      setRepos(await fetchRepos(feedLanguages, setIsFetchingRepos));
    };

    effect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children({
    repos,
    isFetchingRepos,
  });
};

export default Component;
