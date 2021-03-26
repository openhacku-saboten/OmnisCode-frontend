export type RequireOne<T, K extends keyof T = keyof T> = K extends keyof T
  ? PartialRequire<T, K>
  : never;
type PartialRequire<O, K extends keyof O> = {
  [P in K]-?: O[P];
} &
  O;

export type CommentType = 'post' | 'highlight' | 'commit' | 'none';

export type Comment = {
  id?: number;
  type: CommentType;
  user_id: string;
  post_id?: number;
  content: string;
  source?: string;
  // for 'post'
  title?: string;
  // for 'post', 'highlight', 'commit'
  language?: string;
  // for 'post', 'commit'
  code?: string;
  // for 'highlight'
  first_line?: number;
  last_line?: number;
  // for 'commit'
  old_code?: string;
  // date
  created_at: string;
  updated_at: string;
};
