import React from 'react';
import { Repository } from 'github-trending-scrape';
import { createQueryURL, times } from '../../configs';

const fetchRepos = async (
  time = times.daily.url, language: string | undefined, setIsFetching: (state: boolean) => void,
): Promise<Repository[]> => {
  const url = createQueryURL(language || undefined, time);
  setIsFetching(true);
  let results = [] as Repository[];
  try {
    results = await (await fetch(url)).json() as Repository[];
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
    repos: Repository[];
    setLanguage: (newLanguage: string) => Promise<void>;
    setTime: (newTime: string) => Promise<void>;
    isFetchingRepos: boolean;
  }>;
}

const defaults: { time: string; language: string } = {
  time: times.daily.url,
  language: '',
};

const getTimeAndLanguageLocalStorage = (): { time: string; language: string } => {
  if (typeof window !== 'undefined') {
    return {
      time: window.localStorage.getItem('time') || defaults.time,
      language: window.localStorage.getItem('language') || defaults.language,
    };
  } else {
    return {
      time: defaults.time,
      language: defaults.language,
    };
  }
};

const setTimeAndLanguageLocalStorate = (time: string, language: string): void => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('time', time);
    window.localStorage.setItem('language', language);
  }
};

const Component: React.FC<Props> = ({ children }) => {
  const [time, setTime] = React.useState(defaults.time);
  const [language, setLanguage] = React.useState<string | undefined>(defaults.language);
  const [repos, setRepos] = React.useState<Repository[]>([]);
  const [isFetchingRepos, setIsFetchingRepos] = React.useState(false);

  const setTimeAndFetchRepos = async (newTime: string): Promise<void> => {
    setTimeAndLanguageLocalStorate(newTime, language || '');
    setTime(newTime);
    const results = await fetchRepos(newTime, language || undefined, setIsFetchingRepos);
    setRepos(results);
  };

  const setLanguageAndFetchRepos = async (newLanguage: string): Promise<void> => {
    setTimeAndLanguageLocalStorate(time, newLanguage);
    setLanguage(newLanguage);
    const results = await fetchRepos(time, newLanguage || undefined, setIsFetchingRepos);
    setRepos(results);
  };

  React.useEffect(() => {
    const { time: initialTime, language: initialLanguage } = getTimeAndLanguageLocalStorage();
    setTime(initialTime);
    setLanguage(initialLanguage);

    const effect = async (): Promise<void> => {
      setRepos(await fetchRepos(initialTime, initialLanguage || undefined, setIsFetchingRepos));
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
