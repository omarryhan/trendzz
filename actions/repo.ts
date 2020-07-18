import { set, get } from 'idb-keyval';

interface RepoStorage {
  isOpened: boolean;
  lastOpenedAt: number;
}

export const markRepoAsOpened = async (repoUrl: string): Promise<void> => {
  const repo = await get<RepoStorage>(repoUrl);
  await set(repoUrl, {
    ...repo,
    isOpened: true,
    lastOpenedAt: Date.now(),
  });
};

export const getRepo = async (
  repoUrl: string,
): Promise<RepoStorage> => await get<RepoStorage | undefined>(repoUrl) || {
  isOpened: false,
  lastOpenedAt: 0,
};

export const isRepoOpened = async (repoUrl: string): Promise<boolean> => {
  const { isOpened } = (await get<RepoStorage>(repoUrl)) || {};
  if (typeof isOpened === 'undefined') {
    return false;
  }
  return isOpened;
};
