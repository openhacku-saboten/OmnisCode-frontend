import { Grid, Card, Divider, Avatar } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core';
import { Comment } from '../src/type';
import SyntaxHighlighterWithDiff from '../components/SyntaxHighlighterWithDiff';
import marked from 'marked';
import zeroPadding from '../utils/zeroPadding';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      marginBottom: '24px',
      borderRadius: '1rem',
      width: '90%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    content: {
      padding: '0px 16px',
      fontSize: '16px',
      marginTop: '8px',
      marginLeft: '4px',
      marginRight: '4px',
    },
    source: {
      textAlign: 'right',
      paddingTop: '8px',
      paddingRight: '12px',
    },
    divider: {
      marginTop: '12px',
      marginBottom: '12px',
    },
    postTime: {
      color: '#888888',
      paddingBottom: '8px',
      paddingRight: '8px',
    },
    icon: {
      width: '32px',
      height: '32px',
      marginRight: '8px',
      marginBottom: '8px',
    },
  })
);

interface CommentWithAvatar extends Comment {
  is_post_user?: boolean;
  avatar_url?: string;
}

const CommentCard: React.FC<CommentWithAvatar> = (props) => {
  const styles = useStyles();
  const created_at_date = new Date(props.created_at);
  const { data, error } = useSWR(`/user/${props.user_id}`, fetcher);
  if (error) {
    return <Card className={styles.card}>Error</Card>;
  }
  return (
    <Card className={styles.card}>
      <Grid container direction="column">
        <Grid item xs={12}>
          <SyntaxHighlighterWithDiff
            type={props.type}
            language={props.language}
            code={props.code}
            first_line={props.first_line}
            last_line={props.last_line}
            old_code={props.old_code}
          />
        </Grid>
        {props?.source && (
          <Grid item className={styles.source}>
            出典: <a href={props.source}>{props.source}</a>
          </Grid>
        )}
        <Grid item className={styles.content}>
          <span dangerouslySetInnerHTML={{ __html: marked(props.content) }} />
        </Grid>
        <Divider light className={styles.divider} />
        <Grid item>
          <Grid container justify="flex-end" alignItems="center">
            {props.avatar_url && (
              <Grid item>
                <Avatar src={data?.icon_url} className={styles.icon} />
              </Grid>
            )}
            <Grid item className={styles.postTime}>
              {data?.name ?? props.user_id}さん
              {props.is_post_user ? ' (投稿者)' : ''} が{' '}
              {zeroPadding(created_at_date.getFullYear(), 4)}-
              {zeroPadding(created_at_date.getMonth() + 1, 2)}-
              {zeroPadding(created_at_date.getDate(), 2)}{' '}
              {zeroPadding(created_at_date.getHours(), 2)}:
              {zeroPadding(created_at_date.getMinutes(), 2)} に投稿
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CommentCard;
