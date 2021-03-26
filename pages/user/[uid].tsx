import { NextPage } from 'next';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Dialog,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import PostCard from '../../components/PostCard';
import { Comment } from '../../src/type';
import axios from '../../utils/axios';
import Router from 'next/router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    profileArea: {
      maxHeight: 512,
      paddingTop: 64,
      paddingBottom: 48,
    },
    userName: {
      fontSize: 48,
      fontWeight: 'bold',
      [theme.breakpoints.down('sm')]: {
        fontSize: 36,
      },
    },
    userProfile: {
      marginTop: 24,
      fontSize: 24,
      display: '-webkit-box',
      width: '100%',
      wordBreak: 'break-all',
      '-webkit-line-clamp': 5,
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
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
    dialog: {
      margin: '0px',
      borderRadius: '1rem',
    },
    modalCard: {
      backgroundColor: theme.palette.background.default,
      paddingTop: '16px',
      height: '100%',
      overflow: 'auto',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },
    editButton: {
      maxWidth: 256,
      fontSize: 16,
    },
    modalForms: {
      padding: '40px 10%',
    },
    submitButton: {
      height: '48px',
      fontSize: '18px',
    },
    squareButton: {
      borderRadius: '0px',
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

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [userProfile, setUserProfile] = useState<string>('');

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    setPageNum(value);
  };

  // ad-hocすぎる...
  const id = router.query.uid;
  const uid = id === undefined ? '1' : id;

  const res_user = useSWR(`/user/${uid}`, fetcher);
  const res_post = useSWR(`/user/${uid}/post`, fetcher);

  useEffect(() => {
    if (!res_user.error && res_user.data) {
      setUserName(res_user.data.name);
      setUserProfile(res_user.data.profile);
    }
  }, [res_user]);

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

  const updateUserProfile = (userName: string, userProfile: string): void => {
    axios
      .put(
        `/user`,
        {
          name: userName,
          profile: userProfile,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('Token')}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then(() => {
        alert('プロフィールが更新されました');
        localStorage.setItem('userName', userName);
        Router.reload();
      })
      .catch((err) => {
        alert('プロフィールの更新に失敗しました');
        console.log(`catch: ${err}`);
      });
  };

  const editProfileModal: React.FC<Record<string, never>> = () => {
    return (
      <>
        <Card className={styles.modalCard}>
          <h1>プロフィールを編集</h1>
          <Container className={styles.modalForms}>
            <Grid container direction="column" spacing={3}>
              <Grid item xs={12}>
                <TextField
                  defaultValue={userName}
                  label="ユーザー名"
                  onChange={(e) => setUserName(e.target.value)}
                  error={userName.length === 0 || userName.length > 128}
                  helperText="1文字以上128文字以下"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  defaultValue={userProfile}
                  label="プロフィール"
                  onChange={(e) => setUserProfile(e.target.value)}
                  error={userProfile.length > 256}
                  helperText="256文字以下"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Container>
          <Button
            variant="contained"
            color="primary"
            onClick={() => updateUserProfile(userName, userProfile)}
            className={`${styles.submitButton} ${styles.squareButton}`}
            disabled={
              userName.length === 0 ||
              userName.length > 128 ||
              userProfile.length > 256
            }
            fullWidth>
            更新
          </Button>
        </Card>
      </>
    );
  };

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
          <Button
            className={styles.editButton}
            variant="contained"
            color="primary"
            onClick={() => setModalOpen(true)}
            fullWidth>
            プロフィールを編集
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
            {editProfileModal({})}
          </Dialog>
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
