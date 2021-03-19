import { NextPage } from 'next';
import Head from 'next/head';
import { Grid, TextField, Button } from '@material-ui/core';
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
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ marginTop: '60px', marginBottom: '60px' }}>
        <Grid item sm={5}>
          <h1>プロフィール入力ページ</h1>
          <h3>新規登録ありがとうございます。</h3>
          <p>このサイトで表示する名前を入力してください。</p>
          <TextField
            style={{ width: '100%', height: '80px' }}
            id="standard-basic"
            label="UserName"
          />
          <p>あなたのプロフィールを入力してください。</p>
          <TextField
            style={{ width: '100%', height: '80px' }}
            id="standard-basic"
            label="Discription"
          />
          <Button size="large" variant="contained" color="primary">
            登録
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
