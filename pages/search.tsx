import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import WithFetchRepos from '../components/WithFetchRepos';
import SelectSection from '../components/SelectSection';
import Repos from '../components/Repos';
import BottomNav from '../components/BottomNav';

const Page: NextPage = () => (
  <>
    <Head>
      <meta name="title" content="Trendzz | Search" />
      <title>Trendzz | Search</title>
    </Head>
    <Header hideSettings />
    <WithFetchRepos>
      {({
        time,
        language,
        repos,
        setLanguage,
        setTime,
        isFetchingRepos,
      }): ReturnType<React.FC> => (
        <>
          <Repos repos={repos} isFetchingRepos={isFetchingRepos} showRead />
          <SelectSection
            time={time}
            language={language}
            setLanguage={setLanguage}
            setTime={setTime}
          />
        </>
      )}
    </WithFetchRepos>
    <BottomNav />
  </>
);

export default Page;
