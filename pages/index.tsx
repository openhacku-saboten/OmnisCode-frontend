import { Box, Container, useMediaQuery, useTheme } from '@material-ui/core';
import { NextPage } from 'next';
import PostCard from '../components/PostCard';
import { Grid } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';

import DefaultHead from '../components/DefaultHead';

const Home: NextPage = () => {
  const theme = useTheme();
  const isXsSm = useMediaQuery(theme.breakpoints.down('sm'));

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
      <Box m={4}>
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

export default Home;
