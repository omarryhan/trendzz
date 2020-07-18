import React from 'react';
import { createQueryURL, languages, repoLastOpenedExpiryTime } from '../../configs';
import { Repo } from '../types';
import { getRepo } from '../../actions/repo';

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
  hideOpened?: boolean;
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

const Component: React.FC<Props> = ({ children, hideOpened = false }) => {
  const [repos, setRepos] = React.useState<Repo[]>([]);
  const [isFetchingRepos, setIsFetchingRepos] = React.useState(false);
  const feedLanguages = getInitialLanguages();

  React.useEffect(() => {
    const effect = async (): Promise<void> => {
      const fetchedRepos = await fetchRepos(feedLanguages, setIsFetchingRepos);
      const filteredRepos: Repo[] = [];

      await Promise.all(fetchedRepos.map(async (repo) => {
        const { isOpened, lastOpenedAt } = await getRepo(repo.url);
        if (!isOpened || (isOpened && (lastOpenedAt + repoLastOpenedExpiryTime) <= Date.now())) {
          filteredRepos.push(repo);
        }
      }));

      // You can't promise all with filter :((
      // Almost went crazy because it didn't even throw an error
      // const filteredRepos = hideOpened ? await Promise.all(fetchedRepos.filter(
      //   async (repo) => await !isRepoOpened(repo.url),
      // )) : fetchedRepos;

      if (hideOpened) {
        setRepos(filteredRepos);
      } else {
        setRepos(fetchedRepos);
      }
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
