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
        title="Opens Trendzz's repo"
        onClick={(): void => {
          window.open('https://github.com/omarryhan/trendzz', '_blank');
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
