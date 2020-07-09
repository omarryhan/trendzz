import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import FeedLanguagesSettingsSection from '../components/FeedLanguagesSettingsSection';
import BottomNav from '../components/BottomNav';
import SettingsBody from '../components/SettingsBody';
import ContactSettingsSection from '../components/ContactSettingsSection';

const Page: NextPage<{}> = () => (
  <>
    <Head>
      <meta name="title" content="Trendzz | Settings" />
      <title>Trendzz | Settings</title>
    </Head>
    <Header />
    <SettingsBody>
      <FeedLanguagesSettingsSection />
      <ContactSettingsSection />
    </SettingsBody>
    <BottomNav />
  </>
);

export default Page;