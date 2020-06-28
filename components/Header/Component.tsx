import React from 'react';
import styles from './styles.css';
import Logo from '../../public/logo_circular/SVG/logo_circular.svg';
import Info from '../../public/info.svg';

const Component: React.FC<{}> = () => (
  <header className={styles.header}>
    <div className={styles.logoAndTitleWrapper}>
      <div className={styles.logoWrapper}>
        <Logo />
      </div>
      <h1 className={styles.title}>
        Trendzz
      </h1>
    </div>

    <div
      className={styles.infoWrapper}
    >
      <button
        className={styles.infoButton}
        type="button"
        onClick={(): void => {
          window.location.href = 'https://github.com/omarryhan/trendzz';
        }}
      >
        <div style={{ display: 'flex', height: '100%', alignItems: 'center' }}>
          <Info />
        </div>
      </button>
    </div>
  </header>
);

export default Component;
