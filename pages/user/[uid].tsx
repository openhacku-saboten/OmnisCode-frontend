import {
  Avatar,
  Box,
  Container,
  Grid,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import fetcher from '../../utils/fetcher';
import PostCard from '../../components/PostCard';
import axios from 'axios';
import { Head } from 'next/document';
import { Pagination } from '@material-ui/lab';
import EditProfileDialog from '../../components/EditProfileDialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    profileArea: {
      margin: 64,
      height: 512,
      padding: 24,
      display: 'flex',
      flexFlow: 'column',
    },
    userName: {
      fontSize: 48,
      fontWeight: 'bold',
      [theme.breakpoints.down('sm')]: {
        fontSize: 36,
      },
    },
    userProfile: {
      fontSize: 24,
    },
    userIcon: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    message: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 24,
      fontSize: 64,
      fontWeight: 'bold',
    },
  })
);

const UserProfile: NextPage = () => {
  // profile
  const style = useStyles();
  const router = useRouter();
  const { uid } = router.query;

  // posts
  const theme = useTheme();
  const isXsSm = useMediaQuery(theme.breakpoints.down('sm'));
  const cardsPerPage = 6;
  const cardsPerRow = isXsSm ? 1 : 2;
  const [pageNum, setPageNum] = useState(1);

  // fetch user profile
  const userData = useSWR(`/user/${uid}`, fetcher);

  // fetch post infomation
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/user/${uid}/post`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [uid]);

  if (userData.error) {
    console.log('err : ', userData.error.message);
    router.push('/404');
  }
  if (!userData.data) {
    return <Box>Loading</Box>;
  }

  console.log('ok');
  console.log(userData.data);

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
      {/* user infomation */}
      <Box className={style.profileArea}>
        <Avatar
          alt="userIcon"
          src={userData.data.icon_url}
          className={style.userIcon}
        />
        <Typography className={style.userName}>{userData.data.name}</Typography>
        <Typography className={style.userProfile}>
          {userData.data.profile}
        </Typography>
      </Box>

      <EditProfileDialog />

      {/* user posts */}
      <Box m={4}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container style={{ marginTop: '30px' }}>
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
export default UserProfile;
