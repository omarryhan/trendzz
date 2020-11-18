import React from 'react';
import styles from './styles.css';

const defaultMode = 'shuffle';
const entryName = 'languageOrder';

const setShuffleModeInStorage = (val: string): void => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  window.localStorage.setItem(entryName, val);
  return undefined;
};

export const getShuffleModeFromStorage = (): string => {
  if (typeof window === 'undefined') {
    return defaultMode;
  }

  const shuffleMode = window.localStorage.getItem(entryName);

  if (!shuffleMode) {
    setShuffleModeInStorage(defaultMode);
    return defaultMode;
  }

  return shuffleMode;
};

const Component: React.FC = () => {
  const [shuffleMode, setShuffleMode] = React.useState(getShuffleModeFromStorage());

  const onSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name } = event.target;
    const isSelected = name === shuffleMode;

    if (!isSelected) {
      setShuffleModeInStorage(name);
      setShuffleMode(name);
    }
  };

  return (
    <section className={styles.sectionWrapper}>
      <h2 className={styles.settingsTitle}>
        Language order
      </h2>
      <p className={styles.settingsDescription}>
        Select sequential for the feed to be rendered in sequential order according to the
        order the languages were selected.
        <br />
        Select shuffle if you want the results to be shuffled sequentially.
      </p>

      <form>
        <label htmlFor="shuffle" className={styles.labelText}>
          <input
            type="radio"
            id="shuffle"
            name="shuffle"
            checked={shuffleMode === 'shuffle'}
            onChange={
              (e: React.ChangeEvent<HTMLInputElement>): void => onSelect(e)
            }
          />
          Shuffle
        </label>
        <label htmlFor="sequential" className={styles.labelText}>
          <input
            type="radio"
            id="sequential"
            name="sequential"
            checked={shuffleMode === 'sequential'}
            onChange={
              (e: React.ChangeEvent<HTMLInputElement>): void => onSelect(e)
            }
          />
          Sequential
        </label>
      </form>
    </section>
  );
};

export default Component;
