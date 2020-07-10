import React from 'react';
import styles from './styles.css';
import { languages } from '../../configs';

const getCheckedLanguages = (): string[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  const selectedLanguages = window.localStorage.getItem('feedLanguages');
  if (!selectedLanguages) {
    return [];
  }

  return selectedLanguages.split(',');
};

const setCheckedLanguagesLocalStorage = (langs: string[]): void => {
  window.localStorage.setItem('feedLanguages', langs.join(','));
};

const Component: React.FC = () => {
  const [checkedLanguages, setCheckedLanguages] = React.useState(getCheckedLanguages());

  const isLanguageChecked = (name: string): boolean => checkedLanguages.some(
    (lang) => lang === name,
  );

  const onCheck = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name } = event.target;
    const isChecked = isLanguageChecked(name);

    if (isChecked) {
      // remove
      const payload = [...Array.from(new Set(checkedLanguages.filter((lang) => lang !== name)))];
      setCheckedLanguagesLocalStorage(payload);
      setCheckedLanguages(payload);
    } else {
      const payload = [...Array.from(new Set([
        ...checkedLanguages || [],
        name,
      ]))];

      setCheckedLanguagesLocalStorage(payload);
      setCheckedLanguages(payload);
    }
  };

  return (
    <section className={styles.sectionWrapper}>
      <h2 className={styles.settingsTitle}>
        Feed languages
      </h2>
      <p className={styles.settingsDescription}>
        Select the languages you want to show up on your daily feed
      </p>
      <form>
        {Object.keys(languages).map((languageKey) => (
          <div key={languageKey} className={styles.labelInputDiv}>
            <label htmlFor={languageKey} className={styles.labelText}>
              <input
                name={languageKey}
                type="checkbox"
                checked={isLanguageChecked(languageKey)}
                onChange={
                  (e: React.ChangeEvent<HTMLInputElement>): void => onCheck(
                    e,
                  )
                }
              />
              <p>
                {languages[languageKey].name}
              </p>
            </label>
            <br />
          </div>
        ))}
      </form>
    </section>
  );
};

export default Component;
