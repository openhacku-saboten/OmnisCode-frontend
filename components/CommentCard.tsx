import { Grid, Card, Divider } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core';
import { Comment } from '../src/type';
import SyntaxHighlighterWithDiff from '../components/SyntaxHighlighterWithDiff';

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      marginBottom: '24px',
      borderRadius: '1rem',
      padding: '16px',
      width: '80%',
    },
    content: {
      fontSize: '16px',
      marginTop: '16px',
    },
    source: {
      textAlign: 'right',
    },
    divider: {
      marginTop: '12px',
      marginBottom: '12px',
    },
    postTime: {
      color: '#888888',
      textAlign: 'right',
    },
  })
);

const CommentCard: React.FC<Comment> = (props) => {
  const styles = useStyles();
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
          {props.content}
        </Grid>
        <Divider light className={styles.divider} />
        <Grid item className={styles.postTime}>
          2000-01-01 00:00 に投稿
        </Grid>
      </Grid>
    </Card>
  );
};

export default CommentCard;
