import { Avatar, Box, Card, Divider, Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

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
      padding: '12px 18px 0px',
      display: '-webkit-box',
      '-webkit-line-clamp': 7,
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
    },
    dummycode: {
      display: 'flex',
      backgroundColor: '#dddddd',
      height: '170px', // dummyなのでad-hocに
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.only('xs')]: {
        marginTop: '8px',
      },
    },
  })
);

type Props = {
  user_id: string;
  title: string;
  code: string;
  language: string;
  content: string;
  source: string;
};

const PostCard: React.FC<Props> = (props) => {
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <Grid container>
        <Grid item className={styles.header}>
          <Grid container>
            <Grid item>
              <Avatar className={styles.icon}>X</Avatar>
            </Grid>
            <Grid item className={styles.username}>
              username
            </Grid>
            <Grid item className={styles.postdate}>
              2000-01-01に投稿
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
          <Box className={styles.content}>{props.content}</Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box display="flex" className={styles.dummycode}>
            DUMMY
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PostCard;
