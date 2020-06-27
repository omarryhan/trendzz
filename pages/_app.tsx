/* eslint-disable react/jsx-props-no-spreading */
import React, { ErrorInfo } from 'react';
import Head from 'next/head';
import App, { AppInitialProps } from 'next/app';
import Router from 'next/router';
import ReactGA from 'react-ga';
import '../components/global-styles.css';

import { GA_TRACKING_ID, GA_CONFIGS } from '../services/ga';

const initGA = (): void => {
  if (
    typeof window !== 'undefined'
    // @ts-ignore
    && !window.isGAInitialized
  ) {
    ReactGA.initialize(GA_TRACKING_ID, GA_CONFIGS);
    // @ts-ignore
    window.isGAInitialized = true;
  }
};

const onPageView = (): void => {
  if (typeof window !== 'undefined') {
    const location = window.location.pathname + window.location.search;
    ReactGA.set({ page: location });
    ReactGA.pageview(location);
  }
};

interface Metric {
  id: string;
  name: string;
  startTime: number;
  value: number;
  label: 'web-vital' | 'custom';
}

interface CustomAppInitialProps {
  err: Error;
}

// Next.JS handles this
// that's why it's not called here
// https://nextjs.org/docs/advanced-features/measuring-performance#web-vitals
export function reportWebVitals({
  id, name, startTime, value, label,
}: Metric): void {
  ReactGA.event({
    category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    action: name,
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    label: id,
    nonInteraction: true,
  });
}

class MyApp extends App<AppInitialProps & CustomAppInitialProps> {
  public async componentDidMount(): Promise<void> {
    initGA();
    Router.events.on('routeChangeComplete', onPageView);
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    initGA();
    ReactGA.exception({
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      isDevEnv: process.env.NODE_ENV === 'development',
    });
    super.componentDidCatch(error, errorInfo);
  }

  public render(): React.ReactElement {
    const {
      Component, pageProps, err,
    } = this.props;

    // https://blog.expo.io/enabling-ios-splash-screens-for-progressive-web-apps-34f06f096e5c
    return (
      <>
        <Head>
          {/* Cool web standards */}
          <meta name="title" content="Trendzz | Github Trending Repos" />
          <meta name="description" content="Filter Github trending repos by time and programming language" />
          <meta name="keywords" content="Github, Github Trending, Github Trending PWA" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <link rel="shortcut icon" href="/logo_circular/32w/logo_circular.png" />
          <meta name="theme-color" content="#f6f8fa" />
          <link rel="icon" type="image/png" sizes="192x192" href="/logo_circular/192w/logo_circular.png" />
          <link rel="icon" type="image/png" sizes="265x265" href="/logo_circular/256w/logo_circular.png" />
          <link rel="icon" type="image/png" sizes="512x512" href="/logo_circular/512w/logo_circular.png" />
          <link rel="manifest" href="/manifest.json" />

          {/* Apple stuff.. yuk */}
          <link rel="apple-touch-icon" sizes="180x180" href="/logo_circular/180w/logo_circular.png" />
          <meta name="apple-mobile-web-app-status-bar-style" content="#f6f8fa" />
          <meta name="apple-mobile-webapp-title" content="Trendzz" />
          <meta name="apple-touch-fullscreen" content="yes" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="Trendzz" />

          {/* MS stuff.. yuk */}
          <meta name="msapplication-TileColor" content="#f6f8fa" />
        </Head>
        <Component
          {...pageProps}
          err={err}
        />
      </>
    );
  }
}

export default MyApp;
