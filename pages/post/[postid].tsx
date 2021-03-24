import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  Container,
  FormControlLabel,
  Grid,
  Modal,
  TextField,
} from '@material-ui/core';
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
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CommentCard from '../../components/CommentCard';
import { RequireOne, Comment, CommentType } from '../../src/type';
import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // https://github.com/mui-org/material-ui/issues/22278
    oppositeContent: {
      flex: 0.1,
    },
    formCard: {
      marginBottom: '24px',
      borderRadius: '1rem',
      width: '90%',
    },
    icon: {
      width: '32px',
      height: '32px',
    },
    checkbox: {
      marginLeft: '2px',
    },
    modal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxHeight: '80%',
    },
    modalCard: {
      backgroundColor: theme.palette.background.default,
      padding: '16px',
      borderRadius: '1rem',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    previewCard: {
      width: '100%',
      // (100% - 90% (CommentCard)) / 2
      transform: 'translate(5%, 0%)',
      marginTop: '16px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    errorChips: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      listStyle: 'none',
    },
    errorChip: {
      marginLeft: '4px',
      marginRight: '4px',
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

  // TODO: 自身のuser_idとpost.user_idを比較
  const isMyPost = true;

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

  // 最後にコミットされたコード
  const newest_code = [{ ...post, type: 'commit' }, ...comments]
    .filter((comment) => {
      return comment.type === 'commit';
    })
    .slice(-1)[0].code;
  const newest_code_row = newest_code.split(/\n|\r\n/).length;

  // for all
  const [comment, setComment] = useState<string>('## コメント');
  const handleMarkdownEditorChange = (newComment: string): void => {
    setComment(newComment);
  };

  // for 'highlight'
  const [isHighlight, setIsHighlight] = useState<boolean>(false);
  const [highlightFrom, setHighlightFrom] = useState<number>(1);
  const [highlightTo, setHighlightTo] = useState<number>(1);
  console.log(highlightFrom, highlightTo);

  // for 'commit'
  const [isCommit, setIsCommit] = useState<boolean>(false);
  const [committingCode, setCommittingCode] = useState<string>(newest_code);
  const handleCommitEditorChange = (newCode: string): void => {
    setCommittingCode(newCode);
  };

  // 投稿プレビューのモーダルの開閉
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // カードのプレビュー
  const previewCard = (commentType: CommentType) => {
    switch (commentType) {
      case 'highlight': {
        return (
          <CommentCard
            type="highlight"
            user_id="TODO"
            content={comment}
            language={post.language}
            code={newest_code}
            first_line={highlightFrom}
            last_line={highlightTo}
          />
        );
      }
      case 'commit': {
        return (
          <CommentCard
            type="commit"
            user_id="TODO"
            content={comment}
            language={post.language}
            code={committingCode}
            old_code={newest_code}
          />
        );
      }
    }
    return <CommentCard type="none" user_id="TODO" content={comment} />;
  };

  const previewModal = () => {
    let commentType: CommentType = 'none';
    const errorMessages: string[] = [];

    if (isHighlight) {
      commentType = 'highlight';
      if (highlightFrom < 1 || highlightFrom > newest_code_row)
        errorMessages.push(
          `始点の行数は1以上${newest_code_row}以下である必要があります`
        );
      if (highlightTo < 1 || highlightTo > newest_code_row)
        errorMessages.push(
          `終点の行数は1以上${newest_code_row}以下である必要があります`
        );
      if (highlightFrom > highlightTo)
        errorMessages.push('終点の行数は始点の行数以上である必要があります');
    } else if (isCommit) {
      commentType = 'commit';
      if (newest_code === committingCode)
        errorMessages.push('ソースコードが変更されていません');
    }

    if (errorMessages.length > 0) {
      commentType = 'none';
    }

    return (
      <>
        <Container className={styles.modal}>
          <Card className={styles.modalCard}>
            <h1>投稿プレビュー</h1>
            {errorMessages.length > 0 && (
              <>
                <ul className={styles.errorChips}>
                  {errorMessages.map((errorMessage, idx) => (
                    <li key={idx}>
                      <Chip
                        key={idx}
                        color="secondary"
                        label={errorMessage}
                        variant="outlined"
                        className={styles.errorChip}
                      />
                    </li>
                  ))}
                </ul>
              </>
            )}
            <Box className={styles.previewCard}>{previewCard(commentType)}</Box>
          </Card>
        </Container>
      </>
    );
  };

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
              <TimelineContent>
                <Card className={styles.formCard}>
                  <Grid container direction="column">
                    <Grid item xs={12}>
                      <Editor
                        height="240px"
                        theme="vs-dark"
                        defaultLanguage="markdown"
                        defaultValue={comment}
                        options={{ fontSize: '16px' }}
                        onChange={handleMarkdownEditorChange}
                      />
                    </Grid>
                    <Grid item>
                      <Grid container direction="column">
                        <Grid item>
                          <FormControlLabel
                            className={styles.checkbox}
                            control={
                              <Checkbox
                                checked={isHighlight}
                                onChange={(e) => {
                                  setIsHighlight(e.target.checked);
                                  if (e.target.checked) setIsCommit(false);
                                }}
                              />
                            }
                            label="特定の行をハイライトする"
                          />
                        </Grid>
                        {isHighlight && (
                          <Grid item xs={12}>
                            <Grid
                              container
                              alignItems="center"
                              justify="center">
                              <Grid item xs={4}>
                                <TextField
                                  defaultValue={highlightFrom}
                                  label="始点"
                                  type="number"
                                  onChange={(e) =>
                                    setHighlightFrom(
                                      Math.floor(Number(e.target.value))
                                    )
                                  }
                                  error={
                                    highlightFrom < 1 ||
                                    highlightFrom > newest_code_row ||
                                    highlightFrom > highlightTo
                                  }
                                  helperText={
                                    highlightFrom < 1 ||
                                    highlightFrom > newest_code_row ||
                                    highlightFrom > highlightTo
                                      ? `1以上${newest_code_row}以下かつ終点以下の値である必要があります`
                                      : ''
                                  }
                                  fullWidth
                                />
                              </Grid>
                              <Grid item xs={1}>
                                <Box style={{ textAlign: 'center' }}>〜</Box>
                              </Grid>
                              <Grid item xs={4}>
                                <TextField
                                  defaultValue={highlightTo}
                                  label="終点"
                                  type="number"
                                  onChange={(e) =>
                                    setHighlightTo(
                                      Math.floor(Number(e.target.value))
                                    )
                                  }
                                  error={
                                    highlightTo < 1 ||
                                    highlightTo > newest_code_row ||
                                    highlightFrom > highlightTo
                                  }
                                  helperText={
                                    highlightTo < 1 ||
                                    highlightTo > newest_code_row ||
                                    highlightFrom > highlightTo
                                      ? `1以上${newest_code_row}以下かつ始点以上の値である必要があります`
                                      : ''
                                  }
                                  fullWidth
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                    {isMyPost && (
                      <Grid item>
                        <FormControlLabel
                          className={styles.checkbox}
                          control={
                            <Checkbox
                              checked={isCommit}
                              onChange={(e) => {
                                setIsCommit(e.target.checked);
                                if (e.target.checked) setIsHighlight(false);
                              }}
                            />
                          }
                          label="ソースコードを更新する"
                        />
                        {isCommit && (
                          <Editor
                            height="360px"
                            theme="vs-dark"
                            defaultLanguage={post.language}
                            defaultValue={committingCode}
                            options={{ fontSize: '16px' }}
                            onChange={handleCommitEditorChange}
                          />
                        )}
                      </Grid>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setModalOpen(true)}
                      fullWidth>
                      投稿確認 (プレビュー表示)
                    </Button>
                    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                      {previewModal()}
                    </Modal>
                  </Grid>
                </Card>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Container>
      </Box>
    </>
  );
};

export default PostDetail;