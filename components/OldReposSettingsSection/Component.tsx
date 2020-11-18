import React from 'react';
import styles from './styles.css';

const defaultValue = '3';
const entryName = 'appearAgain';

const setAppearAgainInStorage = (val: string): void => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  window.localStorage.setItem(entryName, val);
  return undefined;
};

export const getAppearAgainFromStorage = (): string => {
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  const shuffleMode = window.localStorage.getItem(entryName);

  if (!shuffleMode) {
    setAppearAgainInStorage(defaultValue);
    return defaultValue;
  }

  return shuffleMode;
};

const Component: React.FC = () => {
  const [appearAgainIn, setAppearAgainIn] = React.useState(getAppearAgainFromStorage());

  return (
    <section className={styles.sectionWrapper}>
      <h2 className={styles.settingsTitle}>
        Appear-again period
      </h2>
      <p className={styles.settingsDescription}>
        Show repos after X months since they have been marked as read.
        <br />
        When they show up, they&apos;ll appear as read,
        so that you know that you&apos;ve read them before.
        <br />
        You don&apos;t have to open them to reset the timer, the timer will be reset
        automatically just by them showing up again.
      </p>

      {/* eslint-disable-next-line jsx-a11y/no-onchange */}
      <select
        className={styles.selector}
        value={appearAgainIn}
        name={entryName}
        id={entryName}
        onChange={(e: React.FormEvent<HTMLSelectElement>): void => {
          // @ts-ignore
          const { value } = e.target;
          setAppearAgainInStorage(value);
          setAppearAgainIn(value);
        }}
      >
        <option
          key="0"
          value="0"
        >
          Always show opened repos
        </option>
        <option
          key="3"
          value="3"
        >
          3 Months
        </option>
        <option
          key="6"
          value="6"
        >
          6 Months
        </option>
        <option
          key="12"
          value="12"
        >
          12 Months
        </option>
        <option
        // Equals 833334246575342460 years
        // If Github and Microsoft are still alive by then
        // then we have bigger problems than my code.
          key="9999999999999999999"
          value="9999999999999999999"
        >
          Never
        </option>
      </select>

    </section>
  );
};

export default Component;
