import React from 'react';
import { createQueryURL, times } from '../../configs';
import { Repo } from '../types';

const fetchRepos = async (
  time = times.daily.url, language: string | undefined, setIsFetching: (state: boolean) => void,
): Promise<Repo[]> => {
  const url = createQueryURL(language || undefined, time);
  setIsFetching(true);
  let results = [] as Repo[];
  try {
    results = await (await fetch(url)).json() as Repo[];
  } catch (e) {
    alert(e.message);
    console.error(e);
  } finally {
    setIsFetching(false);
  }
  return results;
};

interface Props {
  children: React.FC<{
    time: string;
    language: string | undefined;
    repos: Repo[];
    setLanguage: (newLanguage: string) => Promise<void>;
    setTime: (newTime: string) => Promise<void>;
    isFetchingRepos: boolean;
  }>;
}

const Component: React.FC<Props> = ({ children }) => {
  const [time, setTime] = React.useState(times.daily.url);
  const [language, setLanguage] = React.useState<string | undefined>('');
  const [repos, setRepos] = React.useState<Repo[]>([]);
  const [isFetchingRepos, setIsFetchingRepos] = React.useState(false);

  const setTimeAndFetchRepos = async (newTime: string): Promise<void> => {
    setTime(newTime);
    const results = await fetchRepos(newTime, language || undefined, setIsFetchingRepos);
    setRepos(results);
  };

  const setLanguageAndFetchRepos = async (newLanguage: string): Promise<void> => {
    setLanguage(newLanguage);
    const results = await fetchRepos(time, newLanguage || undefined, setIsFetchingRepos);
    setRepos(results);
  };

  React.useEffect(() => {
    const effect = async (): Promise<void> => {
      setRepos(await fetchRepos(times.daily.url, undefined, setIsFetchingRepos));
    };

    effect();
  }, []);

  return children({
    time,
    language,
    repos,
    setLanguage: setLanguageAndFetchRepos,
    setTime: setTimeAndFetchRepos,
    isFetchingRepos,
  });
};

export default Component;
