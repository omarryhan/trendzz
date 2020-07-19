import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import WithFetchFeedRepos from '../components/WithFetchFeedRepos';
import Repos from '../components/Repos';
import NoTrendingOctocat from '../components/NoTrendingOctocat';

const Page: NextPage = () => (
  <>
    <Head>
      <meta name="title" content="Trendzz | Feed" />
      <title>Trendzz | Feed</title>
    </Head>
    <Header />
    <WithFetchFeedRepos
      hideOpened
    >
      {({
        repos,
        isFetchingRepos,
      }): ReturnType<React.FC> => (
        <>
          <Repos
            repos={repos}
            isFetchingRepos={isFetchingRepos}
            isBigHeight
            EmptyPlaceholder={NoTrendingOctocat}
          />
        </>
      )}
    </WithFetchFeedRepos>
    <BottomNav />
  </>
);

export default Page;
