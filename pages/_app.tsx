import React, { FC } from 'react';
import { AppProps } from 'next/app';
import '../styles/globals.css';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../src/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Container,
  Link,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import dynamic from 'next/dynamic';

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const DynamicComponentUserName = dynamic(() =>
    import('../components/UserName').then((mod) => mod.UserName)
  );
  const DynamicComponentUserIconImage = dynamic(() =>
    import('../components/UserIconImage').then((mod) => mod.UserIconImage)
  );

  const theme2 = useTheme();
  const showTitle = useMediaQuery(theme2.breakpoints.up('sm'));

  return (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Link href="/">
            <img
              src="https://user-images.githubusercontent.com/31395466/112653377-b1d72080-8e91-11eb-9a90-aa6b7c769ee1.png"
              alt="画像"
              style={{ marginRight: '2px', borderRadius: '50%', height: 64 }}
            />
          </Link>
          {showTitle && (
            <Link href="/">
              <Typography
                variant="h3"
                style={{ color: '#ffffff', fontWeight: 'bold' }}>
                OmnisCode
              </Typography>
            </Link>
          )}
          <Grid
            container
            alignItems="center"
            justify="flex-end"
            direction="row">
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit">
              {/* ログイン済みならtwitterアイコンを表示 / ログインしていなかったら人アイコン*/}
              <DynamicComponentUserIconImage />
              {/* ログイン済みならtwitterの名前を表示 / ログインしていなかったらゲストユーザー*/}
              <DynamicComponentUserName />
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Component {...pageProps} />
        </CssBaseline>
      </ThemeProvider>
      <footer style={{ marginBottom: '20px' }}>
        <Container maxWidth="lg">
          <Typography variant="h6" align="center" gutterBottom>
            OmnisCode
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p">
            Copyright © 2021 OmnisCode All Rights Reserved.
          </Typography>
        </Container>
      </footer>
    </>
  );
};

export default MyApp;
