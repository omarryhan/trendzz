import React from 'react';
import styles from './styles.css';
import SelectBox from '../SelectBox';
import { times, languages } from '../../configs';

interface Props {
  time: string;
  language: string | undefined;
  setLanguage: (lang: string) => Promise<void>;
  setTime: (time: string) => Promise<void>;
}

const Component: React.FC<Props> = ({
  time,
  language,
  setLanguage,
  setTime,
}) => (
  <div className={styles.sectionWrapper}>
    <div className={styles.selectBoxes}>
      <SelectBox
        options={times}
        value={time}
        setValue={setTime}
        selecting="Time"
      />
      <SelectBox
        options={languages}
        value={language}
        setValue={setLanguage}
        selecting="Language"
      />
    </div>
  </div>
);

export default Component;
