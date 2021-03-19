import { NextPage } from 'next';
import Head from 'next/head';
import { Grid } from '@material-ui/core';
import React from 'react';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>OmnisCode</title>
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:title" content="OmnisCode" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ocode.one" />
        <meta property="og:image" content="https://sample.png" />
        <meta property="og:site_name" content="OmnisCode" />
        <meta
          property="og:description"
          content="OmnisCode | コードを共有するSNS"
        />
      </Head>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={8}>
          <h1>投稿ページ</h1>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
