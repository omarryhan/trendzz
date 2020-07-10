import React from 'react';
import Router from 'next/router';
import styles from './styles.css';
import CafeOutline from '../../public/cafe-outline.svg';
import SearchOutline from '../../public/search-outline.svg';
import Cafe from '../../public/cafe.svg';
import Search from '../../public/search.svg';

const Component: React.FC = () => {
  let path = '/';

  if (typeof window !== 'undefined') {
    const splitPath = window.location.href.split('/');
    // eslint-disable-next-line prefer-destructuring
    path = splitPath[3] ? `/${splitPath[3]}` : '/';
  }

  return (
    <footer className={styles.sectionWrapper}>
      <nav className={styles.selectPage}>
        {
          path === '/'
            ? (
              <>
                <button
                  className={`${styles.selectPageButton} ${styles.selectPageButton_active}`}
                  type="button"
                  onClick={(): Promise<boolean> => Router.push('/')}
                >
                  <Cafe />
                  <p className={`${styles.navDescription} ${styles.navDescription_active}`}>
                    Feed
                  </p>
                </button>
                <button
                  className={`${styles.selectPageButton} ${styles.selectPageButton_inactive}`}
                  type="button"
                  onClick={(): Promise<boolean> => Router.push('/search')}
                >
                  <SearchOutline />
                  <p className={`${styles.navDescription} ${styles.navDescription_inactive}`}>
                    Search
                  </p>
                </button>
              </>
            )
            : path.startsWith('/search')
              ? (
                <>
                  <button
                    className={`${styles.selectPageButton} ${styles.selectPageButton_inactive}`}
                    type="button"
                    onClick={(): Promise<boolean> => Router.push('/')}
                  >
                    <CafeOutline />
                    <p className={`${styles.navDescription} ${styles.navDescription_inactive}`}>
                      Feed
                    </p>
                  </button>
                  <button
                    className={`${styles.selectPageButton} ${styles.selectPageButton_active}`}
                    type="button"
                    onClick={(): Promise<boolean> => Router.push('/search')}
                  >
                    <Search />
                    <p className={`${styles.navDescription} ${styles.navDescription_active}`}>
                      Search
                    </p>
                  </button>
                </>
              )
              : (
                <>
                  <button
                    className={`${styles.selectPageButton} ${styles.selectPageButton_inactive}`}
                    type="button"
                    onClick={(): Promise<boolean> => Router.push('/')}
                  >
                    <CafeOutline />
                    <p className={`${styles.navDescription} ${styles.navDescription_inactive}`}>
                      Feed
                    </p>
                  </button>
                  <button
                    className={`${styles.selectPageButton} ${styles.selectPageButton_inactive}`}
                    type="button"
                    onClick={(): Promise<boolean> => Router.push('/search')}
                  >
                    <SearchOutline />
                    <p className={`${styles.navDescription} ${styles.navDescription_inactive}`}>
                      Search
                    </p>
                  </button>
                </>
              )
        }
      </nav>
    </footer>
  );
};

export default Component;
