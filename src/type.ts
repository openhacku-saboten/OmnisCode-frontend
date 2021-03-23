export type CommentType = 'post' | 'highlight' | 'commit' | 'none';

export type Comment = {
  type: CommentType;
  user_id: string;
  post_id?: number;
  content: string;
  source?: string;
  // for 'post', 'highlight', 'commit'
  language?: string;
  // for 'post', 'commit'
  code?: string;
  // for 'highlight'
  first_line?: number;
  last_line?: number;
  // for 'commit'
  old_code?: string;
};
