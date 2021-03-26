import { NextPage } from 'next';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';
import {
  Avatar,
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import PostCard from '../../components/PostCard';
import { Comment } from '../../src/type';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    profileArea: {
      maxHeight: 256,
      paddingTop: 64,
      paddingBottom: 128,
      display: '-webkit-box',
      '-webkit-line-clamp': 5,
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
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
      width: 64,
      height: 64,
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

const PostDetail: NextPage = () => {
  const styles = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const isXsSm = useMediaQuery(theme.breakpoints.down('sm'));

  const cardsPerPage = 6;
  const cardsPerRow = isXsSm ? 1 : 2;
  const [pageNum, setPageNum] = useState(1);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    setPageNum(value);
  };

  // ad-hocすぎる...
  const uid = router.query.uid;
  // const uid = id === undefined ? '1' : id;

  const res_user = useSWR(`/user/${uid}`, fetcher);
  const res_post = useSWR(`/user/${uid}/post`, fetcher);

  if (res_user.error) {
    return <>Error</>;
  }
  const userData = res_user.data;
  if (!userData) {
    return <>Loading...</>;
  }

  if (res_post.error) {
    return <>Error</>;
  }
  const postData = res_post.data as Comment[];
  if (!postData) {
    return <>Loading...</>;
  }

  // 配列をsize個ずつに分ける
  const chunk = <T extends unknown>(arr: T[], size: number): T[][] =>
    arr.reduce(
      (newarr, _, i) =>
        i % size ? newarr : [...newarr, arr.slice(i, i + size)],
      [] as T[][]
    );

  return (
    <>
      <Container style={{ marginTop: '30px', marginBottom: '60px' }}>
        <Box className={styles.profileArea}>
          <Avatar
            alt="userIcon"
            src={userData.icon_url}
            className={styles.userIcon}
          />
          <Typography className={styles.userName}>{userData.name}</Typography>
          <Typography className={styles.userProfile}>
            {userData.profile}
          </Typography>
        </Box>
        <h1>投稿一覧</h1>
        <Box display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(postData.length / cardsPerPage)}
            page={pageNum}
            onChange={handlePageChange}
          />
        </Box>
        <Grid container spacing={3} style={{ marginTop: '10px' }}>
          {chunk(
            postData.slice(
              cardsPerPage * (pageNum - 1),
              cardsPerPage * pageNum
            ),
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
    </>
  );
};

export default PostDetail;
