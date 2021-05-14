import React from 'react';
import Router from 'next/router';
import styles from './styles.css';
import Logo from '../../public/logo_circular/SVG/logo_circular.svg';
import Settings from '../../public/settings.svg';

const Component: React.FC<{ hideSettings?: boolean }> = ({ hideSettings = false }) => (
  <header className={styles.header}>
    <div className={styles.headerContents}>
      <div className={styles.logoAndTitleWrapper}>
        <button
          className={styles.logoWrapper}
          onClick={(): Promise<boolean> => Router.push('/')}
          type="button"
        >
          <Logo />
        </button>
        <h1 className={styles.title}>
          Trendzz
        </h1>
      </div>

      <div
        className={styles.settingsWrapper}
      >
        {
          !hideSettings
            ? (
              <button
                className={styles.settingsButton}
                type="button"
                title="Settings"
                onClick={(): void => {
                  Router.push('/settings');
                }}
              >
                <div style={{ display: 'flex', height: '100%', alignItems: 'center' }}>
                  <Settings />
                </div>
              </button>
            )
            : (
              null
            )
        }
      </div>
    </div>
  </header>
);

export default Component;
