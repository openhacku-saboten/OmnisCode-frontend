import { NextPage } from 'next';
import Head from 'next/head';
import { Grid, TextField, Button } from '@material-ui/core';
import React from 'react';

const Signup: NextPage = () => {
  //登録ボタンが押されたときの処理
  function submit(): void {
    //Nameを取得
    const inputElementName = document.getElementById(
      'textareaName'
    ) as HTMLInputElement;
    const inputValueName = inputElementName.value;
    //Discriptionを取得
    const inputElementDiscription = document.getElementById(
      'textareaDiscription'
    ) as HTMLInputElement;
    const inputValueDiscription = inputElementDiscription.value;

    if (inputValueName == '') {
      window.alert('名前が入力されていません。');
      return;
    }

    alert('名前:' + inputValueName + '\n' + '説明:' + inputValueDiscription);
  }
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
        style={{ minHeight: '100vh' }}>
        <Grid item sm={5}>
          <h1 style={{ textAlign: 'center', marginBottom: '60px' }}>
            プロフィール入力ページ
          </h1>
          <h3>新規登録ありがとうございます。</h3>
          <p>このサイトで表示する名前を入力してください。</p>
          <TextField
            id="textareaName"
            style={{ width: '100%' }}
            label="UserName"
          />
          <p>あなたのプロフィールを入力してください。</p>
          <TextField
            id="textareaDiscription"
            style={{ width: '100%' }}
            label="Discription"
          />
          <Grid container alignItems="center" justify="center">
            <Button
              onClick={submit}
              size="large"
              variant="contained"
              color="primary"
              style={{
                marginBottom: '30px',
                marginTop: '30px',
                width: '60%',
              }}>
              登録
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Signup;
