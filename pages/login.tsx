import { Box, Button, Theme, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { NextPage } from 'next';
import React from 'react';
import TwitterIcon from '@material-ui/icons/Twitter';
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';

import Router from 'next/router';

import { firebaseConfig } from '../utils/firebaseConfig';

/**
 * ---API実装時に見るメモ---
 * idTokenをheadsに入れてサーバーに送信
 * userNameはtwitterのユーザー名(bodyに入れてサーバーに送信)
 * ⇒ 以上の2つの情報をサーバーに送信する
 */

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

  function submit(): void {
    // 初期化は一度だけ(!!重要!!)
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // 認証処理
    // signInWithPopupメソッドを叩くと、認証用のポップアップ画面が表示される。
    // それにTwitterのIDとパスワードを入力すると、コールバックをfirebase側が処理し、
    // 認証成功時はPromise型で認証情報を返す
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        const credential = result.credential as firebase.auth.OAuthCredential;

        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        const token = credential.accessToken;
        console.log('token:' + token);
        const secret = credential.secret;
        console.log('secret:' + secret);
        console.log(result);
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // userNameはtwitterのユーザー名(bodyに入れてサーバーに送信)
        const userName = user.displayName;
        console.log(userName);
        // ローカルストレージにuserNameを保存
        localStorage.setItem('userName', userName);

        // userIconImageはtwitterのアイコン画像(サーバーに送信しない)
        const userIconImage = user.photoURL;
        console.log(userIconImage);
        // ローカルストレージにuserIconImageの画像パスを保存
        localStorage.setItem('userIconImage', userIconImage);

        // userIdはユーザーのログインid(サーバーに送信しない)
        const userId = user.uid;
        console.log(userId);
        // ローカルストレージにuserIdを保存
        localStorage.setItem('userId', userId);

        firebase
          .auth()
          .currentUser.getIdToken(/* forceRefresh */ true)
          .then(function (idToken) {
            // idTokenをheadsに入れてサーバーに送信
            // idTokenはローカルストレージに保存する
            console.log(idToken);
            //ローカルストレージにTokenを保存
            localStorage.setItem('Token', idToken);
          })
          .catch(function (error) {
            window.alert('error can not get current user:' + error);
          });
        // ...
        // API通信
        const auth_token = localStorage.getItem('Token');
        axios
          .post(
            '/api/v1/user',
            {
              name: userName,
              twitter_id: result.additionalUserInfo.username,
              profile: 'this is your profile',
            },
            {
              headers: {
                Authorization: `Bearer ${auth_token}`,
                'Content-Type': 'application/json',
              },
            }
          )
          .then((res) => {
            console.log(res);
            console.log('新規ユーザーです。');
            Router.push('/');
          })
          .catch((error) => {
            console.log('Error : ' + JSON.stringify(error.response));
            console.log('Error msg : ' + error.response.data.message);
            if (
              error.response.data.message == 'twitter id is already used' ||
              error.response.data.message == 'user already exists'
            ) {
              console.log('すでにログイン済みです。');
              Router.push('/');
            } else {
              window.alert('ユーザーのデータが不正です。');
              Router.push('/login');
            }
          });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        const email = error.email;
        console.log(email);
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        console.log(credential);
        // ...
      });
  }
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
        <Button className={styles.loginButton} onClick={submit}>
          <TwitterIcon />
          Login with Twitter
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
