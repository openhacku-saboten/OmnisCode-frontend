import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  Container,
  Dialog,
  FormControlLabel,
  Grid,
  TextField,
  useMediaQuery,
} from '@material-ui/core';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineContent,
  TimelineOppositeContent,
  TimelineConnector,
} from '@material-ui/lab';
import { NextPage, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import CommentCard from '../../components/CommentCard';
import { RequireOne, Comment, CommentType } from '../../src/type';
import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import AddIcon from '@material-ui/icons/Add';

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
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    icon: {
      marginTop: '8px',
      marginBottom: '8px',
      width: '48px',
      height: '48px',
    },
    postUserIcon: {
      border: `3px solid ${theme.palette.secondary.main}`,
    },
    checkbox: {
      marginLeft: '8px',
    },
    squareButton: {
      borderRadius: '0px',
    },
    dialog: {
      margin: '0px',
      borderRadius: '1rem',
    },
    modalCard: {
      backgroundColor: theme.palette.background.default,
      padding: '0px',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    previewCard: {
      width: '100%',
      margin: '16px auto',
    },
    errorChips: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      listStyle: 'none',
      padding: '0px',
    },
    errorChip: {
      margin: '4px',
    },
    submitButton: {
      height: '48px',
      fontSize: '18px',
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
  props?: { post: Comment; post_id: number };
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
      post_id: Number(postid),
    },
  };
};

const PostDetail: NextPage = (props) => {
  const styles = useStyles();

  const theme = useTheme();
  const isXsSm = useMediaQuery(theme.breakpoints.down('sm'));

  // TODO: resolve error
  const post = props.post as Comment;
  const post_id = props.post_id;

  // TODO: 自身のuser_idとpost.user_idを比較
  const isMyPost = true;
  const myUserId = 'lion';

  // dummy
  const comments: Comment[] = [
    {
      user_id: 'cake',
      post_id: post_id,
      type: 'highlight',
      content: 'ここは`Hello`ではなくて、`Hello World`じゃないでしょうか？',
      first_line: 5,
      last_line: 5,
      code: '',
    },
    {
      user_id: 'dog',
      post_id: post_id,
      type: 'none',
      content: '僕もそう思います',
      first_line: 0,
      last_line: 0,
      code: '',
    },
    {
      user_id: 'lion',
      post_id: post_id,
      type: 'commit',
      content: 'こういうことですか？',
      first_line: 0,
      last_line: 0,
      code:
        '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    cout << "Hello World" << endl;\n}\n',
    },
    {
      user_id: 'dog',
      post_id: post_id,
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

  // for 'commit'
  const [isCommit, setIsCommit] = useState<boolean>(false);
  const [committingCode, setCommittingCode] = useState<string>(newest_code);
  const handleCommitEditorChange = (newCode: string): void => {
    setCommittingCode(newCode);
  };

  const postComment = (
    commentType: CommentType,
    content: string,
    first_line: number,
    last_line: number,
    code: string
  ): void => {
    // TODO: commentTypeに応じて処理する
    // TODO: 投稿が成功したら更新をかける (snackbarとかで通知)
    alert('consoleに出力しています');
    console.log('    postID : ', post_id);
    console.log('      type : ', commentType);
    console.log('   content : ', content);
    console.log('first_line : ', first_line);
    console.log(' last_line : ', last_line);
    console.log('      code : ', code);
  };

  // 投稿プレビューのモーダルの開閉
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // カードのプレビュー
  const previewCard: React.FC<CommentType> = (commentType: CommentType) => {
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

  const previewModal: React.FC<Record<string, never>> = () => {
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
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              postComment(
                commentType,
                comment,
                highlightFrom,
                highlightTo,
                committingCode
              )
            }
            className={`${styles.submitButton} ${styles.squareButton}`}
            disabled={errorMessages.length !== 0}
            fullWidth>
            投稿
          </Button>
        </Card>
      </>
    );
  };

  const formCard: React.FC<Record<string, never>> = () => (
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
                <Grid container alignItems="center" justify="center">
                  <Grid item xs={4}>
                    <TextField
                      defaultValue={highlightFrom}
                      label="始点"
                      type="number"
                      onChange={(e) =>
                        setHighlightFrom(Math.floor(Number(e.target.value)))
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
                        setHighlightTo(Math.floor(Number(e.target.value)))
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
          className={styles.squareButton}
          fullWidth>
          投稿確認 (プレビュー表示)
        </Button>
        <Dialog
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          className={styles.dialog}
          fullWidth
          maxWidth="md"
          PaperProps={{
            style: { borderRadius: '0.5rem' },
          }}>
          {previewModal({})}
        </Dialog>
      </Grid>
    </Card>
  );

  return (
    <>
      <Box m={4}>
        <Head>
          <title>{post.title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container style={{ marginTop: '30px' }} disableGutters={isXsSm}>
          <h1 style={{ textAlign: 'center', marginBottom: '60px' }}>
            {post.title}
          </h1>
          {/* TODO: isXsSmならCommentCardにavatar_urlを追加する */}
          {isXsSm ? (
            <>
              <Grid container>
                <Grid item xs={12}>
                  <CommentCard
                    user_id={post.user_id}
                    type="post"
                    content={post.content}
                    code={post.code}
                    language={post.language}
                    source={post.source}
                    is_post_user={true}
                  />
                </Grid>
                {comments.map((comment, idx) => {
                  const old_code = cur_code;
                  if (comment.type === 'commit') {
                    cur_code = comment.code;
                  }
                  return (
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
                      is_post_user={post.user_id === comment.user_id}
                      key={idx}
                    />
                  );
                })}
                {formCard({})}
              </Grid>
            </>
          ) : (
            <Timeline align="left">
              <TimelineItem>
                <TimelineOppositeContent className={styles.oppositeContent} />
                <TimelineSeparator>
                  <Avatar className={`${styles.icon} ${styles.postUserIcon}`}>
                    {post.user_id}
                  </Avatar>
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
                    is_post_user={true}
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
                    <TimelineOppositeContent
                      className={styles.oppositeContent}
                    />
                    <TimelineSeparator>
                      <Avatar
                        className={`${styles.icon} ${
                          myUserId === comment.user_id
                            ? styles.postUserIcon
                            : ''
                        }`}>
                        {comment.user_id}
                      </Avatar>
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
                        is_post_user={post.user_id === comment.user_id}
                      />
                    </TimelineContent>
                  </TimelineItem>
                );
              })}
              <TimelineItem>
                <TimelineOppositeContent className={styles.oppositeContent} />
                <TimelineSeparator>
                  <Avatar className={styles.icon}>
                    <AddIcon />
                  </Avatar>
                </TimelineSeparator>
                <TimelineContent>{formCard({})}</TimelineContent>
              </TimelineItem>
            </Timeline>
          )}
        </Container>
      </Box>
    </>
  );
};

export default PostDetail;
