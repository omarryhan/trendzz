import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import WithFetchRepos from '../components/WithFetchRepos';
import SelectSection from '../components/SelectSection';
import Repos from '../components/Repos';

const Page: NextPage<{}> = () => (
  <>
    <Head>
      <meta name="title" content="Trendzz | Home" />
      <title>Trendzz | Home</title>
    </Head>
    <Header />
    <WithFetchRepos>
      {({
        time,
        language,
        repos,
        setLanguage,
        setTime,
        isFetchingRepos,
      }): ReturnType<React.FC<{}>> => (
        <>
          <Repos repos={repos} isFetchingRepos={isFetchingRepos} />
          <SelectSection
            time={time}
            language={language}
            setLanguage={setLanguage}
            setTime={setTime}
          />
        </>
      )}
    </WithFetchRepos>
  </>
);

export default Page;
