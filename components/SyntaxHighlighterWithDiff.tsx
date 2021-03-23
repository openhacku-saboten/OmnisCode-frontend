import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CommentType } from '../src/type';

type Props = {
  type: CommentType;
  language: string;
  code: string;
  first_line?: number;
  last_line?: number;
  old_code?: string;
};

const SyntaxHighlighterWithDiff: React.FC<Props> = (props) => {
  // 表示する行を抽出
  const selectRows = (
    code: string,
    first_line: number,
    last_line: number
  ): [string, number, number, number, number] => {
    const rows = code.split(/\n|\r\n/);
    const rows_sz = rows.length;
    // 1-indexed && [line_bgn, line_end]
    const line_bgn = first_line - 2 >= 1 ? first_line - 2 : 1;
    const line_end = last_line + 2 <= rows_sz ? last_line + 2 : rows_sz;
    const picked_rows = rows.slice(line_bgn - 1, line_end);
    return [picked_rows.join('\n'), first_line, last_line, line_bgn, line_end];
  };

  switch (props.type) {
    case 'post': {
      return (
        <SyntaxHighlighter
          language={props.language}
          style={atomDark}
          showLineNumbers>
          {props.code}
        </SyntaxHighlighter>
      );
    }
    case 'highlight': {
      const [pickedRows, hl_bgn, hl_end, startingLineNumber] = selectRows(
        props.code,
        props.first_line,
        props.last_line
      );
      return (
        <SyntaxHighlighter
          language={props.language}
          style={atomDark}
          showLineNumbers
          startingLineNumber={startingLineNumber}
          wrapLines={true}
          lineProps={(lineNumber) => {
            const style: {
              display: string;
              backgroundColor?: string;
            } = { display: 'block' };
            if (hl_bgn <= lineNumber && lineNumber <= hl_end) {
              style.backgroundColor = '#e9896aaa';
            }
            return { style };
          }}>
          {pickedRows}
        </SyntaxHighlighter>
      );
    }
    default: {
      return null;
    }
  }
};

export default SyntaxHighlighterWithDiff;
