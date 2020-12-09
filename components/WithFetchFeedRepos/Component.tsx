import React from 'react';
import uniqWith from 'lodash.uniqwith';
import { Repository } from '@huchenme/github-trending';
import {
  // createQueryURL,
  languages,
} from '../../configs';
import { getShuffleModeFromStorage } from '../ShuffleSettingsSection/Component';
import { getRepo, markRepoAsOpened } from '../../actions/repo';
import { getAppearAgainFromStorage } from '../OldReposSettingsSection/Component';

const fetchRepos = async (
  feedLanguages: string[],
): Promise<Repository[]> => {
  let allResults = [] as Repository[][];
  try {
    allResults = await Promise.all(feedLanguages.map(async (language): Promise<Repository[]> => {
      // const url = createQueryURL(languages[language].url, 'daily');
      // return await (await fetch(url)).json() as Repository[];

      // check the comment in pages/api/repositories
      const response = await fetch(`/api/repositories?language=${languages[language].url}`);
      return await response.json() as Repository[];
    }));
  } catch (e) {
    alert(e.message);
    console.error(e);
  }

  const languageOrder = getShuffleModeFromStorage();

  if (languageOrder === 'shuffle') {
    const retVal: Repository[] = [];
    for (let i = 0; i < 100; i += 1) {
      allResults.forEach((results) => {
        const repo = results[i];
        if (repo) {
          retVal.push(repo);
        }
      });
    }
    return retVal;
  } else if (languageOrder === 'sequential') {
    return allResults.flat();
  } else {
    // should never be thrown
    throw new Error('Invalid language order');
  }
};

interface Props {
  children: React.FC<{
    repos: Repository[];
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

const repoComparator = <R extends Repository >(a: R, b: R) => a.url === b.url;

const Component: React.FC<Props> = ({ children, hideOpened = false }) => {
  const [repos, setRepos] = React.useState<Repository[]>([]);
  const [isFetchingRepos, setIsFetchingRepos] = React.useState(true);
  const feedLanguages = getInitialLanguages();

  React.useEffect(() => {
    const effect = async (): Promise<void> => {
      setIsFetchingRepos(true);
      try {
        const fetchedRepos = await fetchRepos(feedLanguages);
        const filteredRepos: Repository[] = [];

        // You can't promise all with filter :((
        // Almost went crazy because it didn't even throw an error
        // const filteredRepos = hideOpened ? await Promise.all(fetchedRepos.filter(
        //   async (repo) => await !isRepoOpened(repo.url),
        // )) : fetchedRepos;

        const appearAgainIn = parseInt(getAppearAgainFromStorage(), 10);

        await Promise.all(fetchedRepos.map(async (repo) => {
          setIsFetchingRepos(true);
          const { isOpened, lastOpenedAt } = await getRepo(repo.url);

          const isOpenedButExpired = isOpened
            && (lastOpenedAt + (
              1000 * 60 * 60 * 24 * 30 * appearAgainIn)
            ) <= Date.now();

          if (!isOpened || isOpenedButExpired) {
            filteredRepos.push(repo);
          }

          if (isOpenedButExpired) {
            // make the new expiry now
            await markRepoAsOpened(repo.url);
          }
        }));

        if (hideOpened) {
          setRepos(uniqWith<Repository>(filteredRepos, repoComparator));
        } else {
          setRepos(uniqWith<Repository>(fetchedRepos, repoComparator));
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
