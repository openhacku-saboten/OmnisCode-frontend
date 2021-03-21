import {
  Button,
  Card,
  CardActions,
  CardContent,
  Theme,
  Typography,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { NextPage } from 'next';
import React from 'react';
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      margin: 64,
      height: 512,
      color: '#404040',
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

  return (
    <Card className={styles.card}>
      <CardContent>
        <Typography className={styles.omniscode} align="center" variant="h2">
          OmnisCode
        </Typography>
        <Typography className={styles.description} align="center" variant="h4">
          OmnisCodeは簡単にコードを共有できるプラットフォームです。ログインして始めましょう。
        </Typography>
      </CardContent>
      <CardActions className={styles.buttonWrapper}>
        <Button className={styles.loginButton}>
          <TwitterIcon />
          <span />
          Login with Twitter
        </Button>
      </CardActions>
    </Card>
  );
};

export default Login;
