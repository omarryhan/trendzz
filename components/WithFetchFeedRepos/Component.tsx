import React from 'react';
import { createQueryURL, languages, repoLastOpenedExpiryTime } from '../../configs';
import { Repo } from '../types';
import { getRepo, markRepoAsOpened } from '../../actions/repo';

const fetchRepos = async (
  feedLanguages: string[],
): Promise<Repo[]> => {
  let allResults = [] as Repo[][];
  try {
    allResults = await Promise.all(feedLanguages.map(async (language): Promise<Repo[]> => {
      const url = createQueryURL(languages[language].url, 'daily');
      return await (await fetch(url)).json() as Repo[];
    }));
  } catch (e) {
    alert(e.message);
    console.error(e);
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
  const [isFetchingRepos, setIsFetchingRepos] = React.useState(true);
  const feedLanguages = getInitialLanguages();

  React.useEffect(() => {
    const effect = async (): Promise<void> => {
      setIsFetchingRepos(true);
      try {
        const fetchedRepos = await fetchRepos(feedLanguages);
        const filteredRepos: Repo[] = [];

        // You can't promise all with filter :((
        // Almost went crazy because it didn't even throw an error
        // const filteredRepos = hideOpened ? await Promise.all(fetchedRepos.filter(
        //   async (repo) => await !isRepoOpened(repo.url),
        // )) : fetchedRepos;

        await Promise.all(fetchedRepos.map(async (repo) => {
          setIsFetchingRepos(true);
          const { isOpened, lastOpenedAt } = await getRepo(repo.url);

          const isOpenedButExpired = isOpened
            && (lastOpenedAt + repoLastOpenedExpiryTime) <= Date.now();

          if (!isOpened || isOpenedButExpired) {
            filteredRepos.push(repo);
          }

          if (isOpenedButExpired) {
            // make the new expiry now
            await markRepoAsOpened(repo.url);
          }
        }));

        if (hideOpened) {
          setRepos(filteredRepos);
        } else {
          setRepos(fetchedRepos);
        }
      } finally {
        setIsFetchingRepos(false);
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
