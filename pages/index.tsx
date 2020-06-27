import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';

const Page: NextPage<{}> = () => (
  <>
    <Head>
      <meta name="title" content="Trendzz | Home" />
      <title>Trendzz | Home</title>
    </Head>
    <Header />
  </>
);

export default Page;
