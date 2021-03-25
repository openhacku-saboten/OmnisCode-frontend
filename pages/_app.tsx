import { FC } from 'react';
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

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4">OmnisCode</Typography>
          <Grid
            container
            alignItems="flex-start"
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
