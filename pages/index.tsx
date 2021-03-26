import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { NextPage } from 'next';
import PostCard from '../components/PostCard';
import { Grid } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import TwitterIcon from '@material-ui/icons/Twitter';
import AddIcon from '@material-ui/icons/Add';
import DefaultHead from '../components/DefaultHead';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topHeader: {
      [theme.breakpoints.only('xs')]: {
        height: '256px',
      },
      [theme.breakpoints.only('sm')]: {
        height: '384px',
      },
      [theme.breakpoints.up('md')]: {
        height: '640px',
      },
      [theme.breakpoints.down('md')]: {
        textAlign: 'center',
      },
    },
    firstLetter: {
      color: theme.palette.primary.main,
    },
    loginButton: {
      backgroundColor: theme.palette.primary.main,
      color: '#ffffff',
    },
    twitterShareButton: {
      backgroundColor: '#55acee',
      color: '#ffffff',
    },
  })
);

const Home: NextPage = () => {
  const styles = useStyles();
  const theme = useTheme();
  const isXsSmMd = useMediaQuery(theme.breakpoints.down('md'));
  const isXsSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));

  const cardsPerPage = 6;
  const cardsPerRow = isXsSm ? 1 : 2;
  const [pageNum, setPageNum] = useState(1);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/post');
        setPosts(res.data.reverse());
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    setPageNum(value);
  };

  // 配列をsize個ずつに分ける
  const chunk = <T extends unknown>(arr: T[], size: number): T[][] =>
    arr.reduce(
      (newarr, _, i) =>
        i % size ? newarr : [...newarr, arr.slice(i, i + size)],
      [] as T[][]
    );

  return (
    <>
      <DefaultHead pageName="" />
      <Box
        style={{
          height: isXs ? '256px' : isXsSm ? '384px' : '640px',
          backgroundColor: '#ffffff',
        }}>
        <Container>
          <Grid
            container
            justify="center"
            alignContent="center"
            alignItems="center">
            <Grid
              container
              item
              xs={12}
              md={6}
              justify="center"
              alignItems="center"
              className={styles.topHeader}>
              <Grid container direction="column">
                <Grid item xs={12}>
                  <Typography variant={isXs ? 'h5' : 'h4'}>
                    みんなのコード共有SNS
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant={isXs ? 'h3' : isXsSm ? 'h2' : 'h1'}
                    style={{ borderBottom: '1px solid black' }}>
                    <span className={styles.firstLetter}>O</span>mnis
                    <span className={styles.firstLetter}>C</span>ode
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ marginLeft: '8px', marginTop: '16px' }}>
                  <Grid
                    container
                    spacing={2}
                    justify={isXsSmMd ? 'center' : 'flex-start'}>
                    <Grid item>
                      <Button
                        href="/login"
                        variant="contained"
                        className={styles.loginButton}
                        startIcon={<AddIcon />}>
                        登録する
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        href={`http://twitter.com/share?url=${
                          process.env.baseUrl
                        }%0A&text=${encodeURIComponent(
                          '「みんなのコード共有SNS」OmnisCode'
                        )}%0A&hashtags=OmnisCode`}
                        target="_blank"
                        variant="contained"
                        className={styles.twitterShareButton}
                        startIcon={<TwitterIcon />}>
                        共有する
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {!isXsSm && (
              <Grid
                container
                item
                alignContent="center"
                xs={6}
                style={{ marginTop: '4vh', height: '52vh' }}>
                <img
                  alt="headerImage"
                  src="https://user-images.githubusercontent.com/45159150/112662896-8eb16e80-8e9b-11eb-93c7-b41b1d5a7a56.png"
                  height="512px"
                />
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
      <Box m={4}>
        <Container style={{ marginTop: '60px' }}>
          <h1>投稿一覧</h1>
          <Box display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(posts.length / cardsPerPage)}
              page={pageNum}
              onChange={handlePageChange}
            />
          </Box>
          <Grid container spacing={3} style={{ marginTop: '10px' }}>
            {chunk(
              posts.slice(cardsPerPage * (pageNum - 1), cardsPerPage * pageNum),
              cardsPerRow
            ).map((row, idx_i) => (
              <Grid item xs={12} key={idx_i}>
                <Grid container spacing={3}>
                  {row.map((post, idx_j) => (
                    <Grid item xs={12} md={6} key={idx_j}>
                      <PostCard
                        user_id={post.user_id}
                        post_id={post.id}
                        title={post.title}
                        code={post.code}
                        language={post.language}
                        content={post.content}
                        source={post.source}
                        created_at={post.created_at}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Home;
