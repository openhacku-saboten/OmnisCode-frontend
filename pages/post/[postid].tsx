import { Avatar, Box, Container } from '@material-ui/core';
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  TimelineContent,
  TimelineOppositeContent,
  TimelineConnector,
} from '@material-ui/lab';
import { NextPage, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CommentCard from '../../components/CommentCard';
import { RequireOne, Comment } from '../../src/type';

const useStyles = makeStyles(() =>
  createStyles({
    // https://github.com/mui-org/material-ui/issues/22278
    oppositeContent: {
      flex: 0.2,
    },
    commentCard: {
      marginTop: '32px',
    },
    icon: {
      width: '32px',
      height: '32px',
    },
  })
);

const isNumber = (s: string): boolean => {
  return /^\d+$/.test(s);
};

export const getServerSideProps = ({
  params,
}: GetServerSidePropsContext): RequireOne<{
  notFound?: boolean;
  props?: { post: Comment };
}> => {
  const postid = params.postid as string;
  if (!isNumber(postid)) {
    return { notFound: true };
  }

  // dummy
  return {
    props: {
      post: {
        type: 'post', // 自分で付与する
        user_id: 'lion',
        title: 'なんか通らない' + postid,
        code:
          '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    cout << "Hello" << endl;\n}\n',
        language: 'cpp',
        content:
          'このコードだと<https://example.com/problem>の問題が通りません。\n\nどうしたらよいでしょうか？',
        source: 'https://example.com/code',
      },
    },
  };
};

const PostDetail: NextPage = (props) => {
  const styles = useStyles();

  // TODO: resolve error
  const post = props.post as Comment;

  // dummy
  const comments: Comment[] = [
    {
      user_id: 'cake',
      post_id: 0,
      type: 'highlight',
      content: 'ここは`Hello`ではなくて、`Hello World`じゃないでしょうか？',
      first_line: 5,
      last_line: 5,
      code: '',
    },
    {
      user_id: 'dog',
      post_id: 0,
      type: 'none',
      content: '僕もそう思います',
      first_line: 0,
      last_line: 0,
      code: '',
    },
    {
      user_id: 'lion',
      post_id: 0,
      type: 'commit',
      content: 'こういうことですか？',
      first_line: 0,
      last_line: 0,
      code:
        '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    cout << "Hello World" << endl;\n}\n',
    },
    {
      user_id: 'dog',
      post_id: 0,
      type: 'none',
      content: 'そうです',
      first_line: 0,
      last_line: 0,
      code: '',
    },
  ];

  // その時点での最新のコード
  let cur_code = post.code;

  return (
    <>
      <Box m={4}>
        <Head>
          <title>{post.title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container style={{ marginTop: '30px' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '60px' }}>
            {post.title}
          </h1>
          <Timeline align="left">
            <TimelineItem>
              <TimelineOppositeContent className={styles.oppositeContent} />
              <TimelineSeparator>
                <TimelineDot>
                  <Avatar className={styles.icon}>{post.user_id}</Avatar>
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <CommentCard
                  user_id={post.user_id}
                  type="post"
                  content={post.content}
                  code={post.code}
                  language={post.language}
                  source={post.source}
                />
              </TimelineContent>
            </TimelineItem>
            {comments.map((comment, idx) => {
              const old_code = cur_code;
              if (comment.type === 'commit') {
                cur_code = comment.code;
              }
              return (
                <TimelineItem key={idx}>
                  <TimelineOppositeContent className={styles.oppositeContent} />
                  <TimelineSeparator>
                    <TimelineDot>
                      <Avatar className={styles.icon}>{comment.user_id}</Avatar>
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <CommentCard
                      type={comment.type}
                      user_id={comment.user_id}
                      content={comment.content}
                      source={comment.source}
                      language={post.language}
                      code={cur_code}
                      first_line={comment.first_line}
                      last_line={comment.last_line}
                      old_code={old_code}
                    />
                  </TimelineContent>
                </TimelineItem>
              );
            })}
            <TimelineItem>
              <TimelineOppositeContent className={styles.oppositeContent} />
              <TimelineSeparator>
                <TimelineDot>
                  <Avatar className={styles.icon}>+</Avatar>
                </TimelineDot>
              </TimelineSeparator>
              <TimelineContent />
            </TimelineItem>
          </Timeline>
        </Container>
      </Box>
    </>
  );
};

export default PostDetail;
