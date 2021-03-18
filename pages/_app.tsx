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
import AccountCircle from '@material-ui/icons/AccountCircle';

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
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
              <p style={{ fontSize: 'small' }}>UserName</p>
              <AccountCircle fontSize="large" />
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Component {...pageProps} />
        </CssBaseline>
      </ThemeProvider>
      <footer>
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
