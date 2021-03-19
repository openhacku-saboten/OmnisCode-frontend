import { Box, Container } from '@material-ui/core';
import { NextPage } from 'next';
import Head from 'next/head';
import PostCard from '../components/PostCard';
import { Grid } from '@material-ui/core';

const Home: NextPage = () => {
  // dummy posts
  const posts = [...Array(5)].map((_, idx) => ({
    user_id: `user_id${('000' + (idx + 1)).slice(-3)}`,
    title:
      `AGC${('000' + (idx + 1)).slice(-3)}のF問題が通りません` +
      'ん'.repeat(idx * 5),
    code: `#include <bits/stdc++.h>\nusing namespace std;\n#define int long long\n\nsigned main() {\n    cout << ${
      idx + 1
    } << endl;\n}`,
    language: 'C++',
    content: 'あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。'.repeat(
      idx + 1
    ),
    source: 'http://example.com',
  }));

  return (
    <Box m={4}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container style={{ marginTop: '30px' }}>
        <Grid container spacing={6}>
          {posts.map((post, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <PostCard
                user_id={post.user_id}
                title={post.title}
                code={post.code}
                language={post.language}
                content={post.content}
                source={post.source}></PostCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
