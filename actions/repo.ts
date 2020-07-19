import { set, get } from 'idb-keyval';

interface RepoStorage {
  isOpened: boolean;
  lastOpenedAt: number;
}

const defaultRepo: RepoStorage = {
  isOpened: false,
  lastOpenedAt: 0,
};

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

export const toggleOpenedState = async (repoUrl: string): Promise<void> => {
  try {
    const repo = await get<RepoStorage | undefined>(repoUrl) || defaultRepo;
    await set(repoUrl, {
      ...repo,
      isOpened: !repo.isOpened,
      lastOpenedAt: !repo.lastOpenedAt
        ? Date.now()
        : repo.isOpened
          ? repo.lastOpenedAt
          : Date.now(),
    });
  } catch (e) {
    console.error(e);
  }
};

export const getRepo = async (
  repoUrl: string,
): Promise<RepoStorage> => {
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
