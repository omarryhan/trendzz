import { set, get } from 'idb-keyval';

interface RepoStorage {
  isOpened?: boolean
}

export const markRepoAsOpened = async (repoUrl: string): Promise<void> => {
  const repo = await get<RepoStorage>(repoUrl);
  await set(repoUrl, {
    ...repo,
    isOpened: true,
  });
};

export const isRepoOpened = async (repoUrl: string): Promise<boolean> => {
  const { isOpened } = (await get<RepoStorage>(repoUrl)) || {};
  if (typeof isOpened === 'undefined') {
    return false;
  }
  return isOpened;
};
