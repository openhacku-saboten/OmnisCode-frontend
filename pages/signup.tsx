import { NextPage } from 'next';
import { Grid, TextField, Button } from '@material-ui/core';
import React from 'react';

import CustomHead from '../components/CustomHead';
import DefaultHead from '../components/DefaultHead';

/**
 * CustomHeadは記事詳細ページ専用のコンポーネントです。
 * ->使い方 35行目を参照
 * DefaultHeadはその他のページで使うコンポーネントです。
 * ->ベースURL以下のURLパラメータをpageNameに入れてください
 */

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
      {/* <CustomHead
        title="記事のタイトルを入れる"
        postId={1}
        image="OGP画像のパスが入ります。"
      /> */}
      <DefaultHead pageName="sinup" />
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ minHeight: '75vh' }}>
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
