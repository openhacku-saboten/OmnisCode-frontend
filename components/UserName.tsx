import { firebaseConfig } from '../utils/firebaseConfig';
import axios from '../utils/axios';
import firebase from 'firebase/app';
import React from 'react';
import { Link, Typography, useTheme, useMediaQuery } from '@material-ui/core';

export function UserName(): JSX.Element {
  const theme = useTheme();
  const showName = useMediaQuery(theme.breakpoints.up('md'));
  if (!showName) {
    return <></>;
  }
  const userName = localStorage.getItem('userName');
  const userId = localStorage.getItem('userId');
  const refreshToken = localStorage.getItem('refreshToken');

  const lostTokenTime = Number(localStorage.getItem('lostTokenTime'));
  const nowTime = new Date().getTime();
  const elapsedTime = lostTokenTime - nowTime;
  console.log(elapsedTime);
  console.log(nowTime, lostTokenTime);

  if (nowTime > lostTokenTime) {
    console.log('リフレッシュ！！');
    // 初期化は一度だけ(!!重要!!)
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    //postパラメータを設定
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);

    //リクエスト
    axios
      .post(
        'https://securetoken.googleapis.com/v1/token?key=' +
          firebaseConfig.apiKey,
        params
      )
      .then((res) => {
        console.log(res.data.access_token);
        console.log(res);
        //ローカルストレージにTokenを保存(自動更新)
        localStorage.setItem('Token', res.data.access_token);

        const timeSet = 60 * 60 * 500;
        const newlostTokenTime = String(nowTime + timeSet);
        localStorage.setItem('lostTokenTime', newlostTokenTime);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  if (userName) {
    return (
      <Link href={'/user/' + userId}>
        <Typography
          style={{
            fontSize: 'medium',
            textDecoration: 'none !important',
            color: '#ffffff',
          }}>
          {userName}
        </Typography>
      </Link>
    );
  } else {
    return (
      <Link href="/login">
        <Typography style={{ fontSize: 'medium', color: '#ffffff' }}>
          ログイン
        </Typography>
      </Link>
    );
  }
}
