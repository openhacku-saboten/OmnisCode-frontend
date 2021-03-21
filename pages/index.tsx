import { Box, Container, useMediaQuery, useTheme } from '@material-ui/core';
import { NextPage } from 'next';
import Head from 'next/head';
import PostCard from '../components/PostCard';
import { Grid } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useState } from 'react';

const Home: NextPage = () => {
  const theme = useTheme();
  const isXsSm = useMediaQuery(theme.breakpoints.down('sm'));

  const cardsPerPage = 6;
  const cardsPerRow = isXsSm ? 1 : 2;
  const [pageNum, setPageNum] = useState(1);

  // dummy posts
  const posts = [...Array(100)].map((_, idx) => ({
    user_id: `user_id${('000' + (idx + 1)).slice(-3)}`,
    title:
      `AGC${('000' + (idx + 1)).slice(-3)}のF問題が通りません` +
      'ん'.repeat(idx),
    code: `#include <bits/stdc++.h>\nusing namespace std;\n#define int long long\n\nsigned main() {\n    cout << ${
      idx + 1
    } << endl;\n}`,
    language: 'C++',
    content: 'あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。'.repeat(
      idx + 1
    ),
    source: 'http://example.com',
  }));

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
                      title={post.title}
                      code={post.code}
                      language={post.language}
                      content={post.content}
                      source={post.source}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
