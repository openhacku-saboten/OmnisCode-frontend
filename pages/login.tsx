import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { NextPage } from 'next';
import React from 'react';
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles(() =>
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
    name: {
      fontSize: 48,
      fontWeight: 'bold',
    },
    description: {
      fontSize: 24,
      color: '#77838c',
      margin: 24,
    },
    button: {
      backgroundColor: '#00acee',
      fontWeight: 'bold',
      color: '#ffffff',
      padding: 16,
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
        <Typography className={styles.name} align="center" variant="h2">
          OmnisCode
        </Typography>
        <Typography className={styles.description} align="center" variant="h4">
          OmnisCodeは簡単にコードを共有できるプラットフォームです。ログインして始めましょう。
        </Typography>
      </CardContent>
      <CardActions className={styles.buttonWrapper}>
        <Button className={styles.button}>
          <TwitterIcon />
          <span />
          Login with Twitter
        </Button>
      </CardActions>
    </Card>
  );
};

export default Login;
