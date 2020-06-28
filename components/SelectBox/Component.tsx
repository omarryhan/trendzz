import React from 'react';
import styles from './styles.css';
import { Options } from '../../configs';

interface Props {
  value: string | undefined;
  setValue: (value: string) => Promise<void>;
  options: Options;
  selecting: string;
}

const Component: React.FC<Props> = ({
  value,
  setValue,
  options,
  selecting,
}) => (
  <div className={styles.selectBoxWrapper}>
    {/* eslint-disable-next-line jsx-a11y/no-onchange */}
    <select
      className={styles.selector}
      name={selecting}
      id={selecting}
      onChange={(e: React.FormEvent<HTMLSelectElement>): void => {
        // @ts-ignore
        setValue(e.target.value);
      }}
    >
      {
        Object.keys(options).map((optionKey) => (
          <option
            key={options[optionKey].url}
            value={options[optionKey].url}
          >
            {options[optionKey].name}
          </option>
        ))
      }
    </select>
  </div>
);

export default Component;
