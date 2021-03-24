import { Box, Button, Theme, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { NextPage } from 'next';
import React from 'react';
import TwitterIcon from '@material-ui/icons/Twitter';

import firebase from 'firebase/app';
import 'firebase/auth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    displayBox: {
      margin: 64,
      height: 512,
      backgroundColor: '#ffffff',
      padding: 24,
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
    omniscode: {
      fontSize: 48,
      fontWeight: 'bold',
      [theme.breakpoints.down('sm')]: {
        fontSize: 36,
      },
    },
    description: {
      fontSize: 24,
      color: '#77838c',
      margin: 24,
    },
    loginButton: {
      backgroundColor: '#00acee',
      fontWeight: 'bold',
      color: '#ffffff',
      padding: 16,
      fontSize: 16,
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
      },
    },
    buttonWrapper: {
      justifyContent: 'center',
      margin: 16,
    },
  })
);

const Login: NextPage = () => {
  const styles = useStyles();

  const firebaseConfig = {
    apiKey: 'AIzaSyANZ7TpygQkvJuRu7PyIuT8jIdELSdijPg',
    authDomain: 'omniscode-31b23.firebaseapp.com',
    projectId: 'omniscode-31b23',
    storageBucket: 'omniscode-31b23.appspot.com',
    messagingSenderId: '1031677260576',
    appId: '1:1031677260576:web:7f63ca23496d71deeb1d45',
    measurementId: 'G-EX6EXHMLGV',
  };

  // 初期化は一度だけ(!!重要!!)
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  //以下ブログ記事抜粋
  // 実際の認証処理。
  // signInWithPopupメソッドを叩くと、認証用のポップアップ画面が表示される。
  // それにGoogleのIDとパスワードを入力すると、コールバックをfirebase側が処理し、
  // 認証成功時はPromise型で認証情報を返す
  const provider = new auth.GoogleAuthProvider();
  auth()
    .signInWithPopup(provider)
    .then((result) => {
      // 認証成功時、credentialプロパティに認証情報が含まれることがある
      const credential = result.credential;
      if (credential !== null) {
        // credentialに対する型推論結果はauth.AuthCredential型。
        // しかしGoogleの場合はOAuthなので、auth.OAuthCredential型に
        // キャストしないと、IDトークン・アクセストークンを取り出せない
        // (OAuthCredential型はAuthCredential型を継承している)
        const idToken = (credential as auth.OAuthCredential).idToken;
        const accessToken = (credential as auth.OAuthCredential).accessToken;
        console.log(idToken);
        console.log(accessToken);
        // ただ認証するだけでなく、IDトークン・アクセストークンが必要な際は、
        // 別途REST APIを叩くなどして利用できる
      }

      // 認証成功時、userプロパティに認証情報が含まれることがある
      const user = result.user;
      if (user !== null) {
        // displayNameはいわば「表示名」(≒ハンドルネーム)。
        // uidは、firebaseにおいてユーザーを一意に識別するためのユニークなID
        const displayName = user.displayName;
        const uid = user.uid;
        console.log(displayName);
        console.log(uid);
      }
    })
    .catch((error) => {
      // エラー発生時は、その詳細が
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
      console.log(error);
      console.log(errorCode);
      console.log(errorMessage);
      console.log(email);
      console.log(credential);
    });

  return (
    <Box className={styles.displayBox} borderRadius={16}>
      <Box>
        <Typography className={styles.omniscode} align="center" variant="h2">
          OmnisCode
        </Typography>
        <Typography className={styles.description} align="center" variant="h4">
          OmnisCodeは簡単にコードを共有できるプラットフォームです。ログインして始めましょう。
        </Typography>
      </Box>
      <Box className={styles.buttonWrapper}>
        <Button className={styles.loginButton}>
          <TwitterIcon />
          Login with Twitter
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
