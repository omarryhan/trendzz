import { set, get } from 'idb-keyval';

interface RepoStorage {
  isOpened: boolean;
  lastOpenedAt: number;
}

export const markRepoAsOpened = async (repoUrl: string): Promise<void> => {
  try {
    const repo = await get<RepoStorage | undefined>(repoUrl) || {};
    await set(repoUrl, {
      ...repo,
      isOpened: true,
      lastOpenedAt: Date.now(),
    });
  } catch (e) {
    console.error(e);
  }
};

export const getRepo = async (
  repoUrl: string,
): Promise<RepoStorage> => {
  const defaultRepo: RepoStorage = {
    isOpened: false,
    lastOpenedAt: 0,
  };

  let resp: RepoStorage = defaultRepo;
  try {
    resp = await get<RepoStorage | undefined>(repoUrl) || defaultRepo;
  } catch (e) {
    console.error(e);
    return defaultRepo;
  }
  return resp;
};

export const isRepoOpened = async (
  repoUrl: string,
): Promise<boolean> => (await getRepo(repoUrl)).isOpened;
