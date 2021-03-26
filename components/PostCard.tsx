import {
  Avatar,
  ButtonBase,
  Box,
  Card,
  Divider,
  Grid,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Router from 'next/router';
import marked from 'marked';
import { id2ogp } from '../utils/language';
import cutHeadLines from '../utils/cutHeadLines';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      [theme.breakpoints.up('sm')]: {
        height: '250px',
      },
      borderRadius: '1rem',
      '&:hover': {
        boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
      },
    },
    header: {
      width: '100%',
      padding: '12px 12px 0px',
    },
    icon: {
      width: '24px',
      height: '24px',
    },
    username: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '6px',
    },
    postdate: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 'auto',
      color: '#aaaaaa',
    },
    title: {
      fontSize: '24px',
      padding: '8px 16px',
      width: '100%',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    content: {
      padding: '8px 16px 0px',
      display: '-webkit-box',
      '-webkit-line-clamp': 7,
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
    },
    dummycode: {
      // display: 'flex',
      // backgroundColor: '#dddddd',
      height: '170px', // dummyなのでad-hocに
      // textAlign: 'center',
      // alignItems: 'center',
      // justifyContent: 'center',
      [theme.breakpoints.only('xs')]: {
        marginTop: '8px',
      },
    },
    buttonbase: {
      display: 'block',
      textAlign: 'initial',
      width: '100%',
      height: '100%',
    },
  })
);

type Props = {
  user_id: string;
  post_id: number;
  title: string;
  code: string;
  language: string;
  content: string;
  source: string;
  created_at: string;
};

const zeroPadding = (s: number, len: number): string => {
  return ('0'.repeat(len) + s).slice(-len);
};

const PostCard: React.FC<Props> = (props) => {
  const styles = useStyles();

  const { data, error } = useSWR(`/user/${props.user_id}`, fetcher);
  if (error) {
    return <Box>Error</Box>;
  }
  if (!data) {
    return (
      <Card className={styles.card}>
        <ButtonBase
          className={styles.buttonbase}
          onClick={() => {
            Router.push(`/post/${props.post_id}`);
          }}>
          <Grid container>
            <Grid item className={styles.header}>
              <Grid container>
                <Grid item>
                  <Avatar className={styles.icon} />
                </Grid>
                <Grid item className={styles.username}>
                  Loading...
                </Grid>
                <Grid item className={styles.postdate} />
              </Grid>
            </Grid>
            <Grid item className={styles.title}>
              {props.title}
            </Grid>
          </Grid>
          <Divider light />
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Box className={styles.content}>
                <span
                  dangerouslySetInnerHTML={{ __html: marked(props.content) }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" className={styles.dummycode}>
                <img
                  alt="code"
                  src={`https://omniscode-og-image-kaito.vercel.app/${encodeURIComponent(
                    cutHeadLines(props.code)
                  )}.jpeg?theme=tomorrow-night-blue&lang=${id2ogp(
                    props.language
                  )}`}
                />
              </Box>
            </Grid>
          </Grid>
        </ButtonBase>
      </Card>
    );
  }

  const created_at_date = new Date(props.created_at);

  return (
    <Card className={styles.card}>
      <ButtonBase
        className={styles.buttonbase}
        onClick={() => {
          Router.push(`/post/${props.post_id}`);
        }}>
        <Grid container>
          <Grid item className={styles.header}>
            <Grid container>
              <Grid item>
                <Avatar className={styles.icon} src={data.icon_url} />
              </Grid>
              <Grid item className={styles.username}>
                {data.name ?? ''}
              </Grid>
              <Grid item className={styles.postdate}>
                {zeroPadding(created_at_date.getFullYear(), 4)}-
                {zeroPadding(created_at_date.getMonth() + 1, 2)}-
                {zeroPadding(created_at_date.getDate(), 2)}{' '}
                {zeroPadding(created_at_date.getHours(), 2)}:
                {zeroPadding(created_at_date.getMinutes(), 2)} に投稿
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={styles.title}>
            {props.title}
          </Grid>
        </Grid>
        <Divider light />
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Box className={styles.content}>
              <span
                dangerouslySetInnerHTML={{ __html: marked(props.content) }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" className={styles.dummycode}>
              <img
                alt="code"
                src={`https://omniscode-og-image-kaito.vercel.app/${encodeURIComponent(
                  cutHeadLines(props.code)
                )}.jpeg?theme=tomorrow-night-blue&lang=${id2ogp(
                  props.language
                )}`}
              />
            </Box>
          </Grid>
        </Grid>
      </ButtonBase>
    </Card>
  );
};

export default PostCard;
