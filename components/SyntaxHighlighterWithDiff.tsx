import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { diffLines } from 'diff';
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
  // 余計なmarginを消す
  const atomDarkWithoutMargin = {
    ...atomDark,
    'pre[class*="language-"]': {
      ...atomDark['pre[class*="language-"]'],
      margin: '0 0',
    },
  };

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
          style={atomDarkWithoutMargin}
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
          style={atomDarkWithoutMargin}
          showLineNumbers
          startingLineNumber={startingLineNumber}
          wrapLines={true}
          lineProps={(lineNumber) => {
            const style: {
              display: string;
              backgroundColor?: string;
            } = { display: 'block' };
            if (hl_bgn <= lineNumber && lineNumber <= hl_end) {
              style.backgroundColor = '#f8dc8188';
            }
            return { style };
          }}>
          {pickedRows}
        </SyntaxHighlighter>
      );
    }
    case 'commit': {
      const diffs = diffLines(props.old_code, props.code);
      let code = '';

      // 行番号を管理
      let row = 1;
      let row_add = 1;
      let row_rem = 1;

      // [行数, 行数(Add), 行数(Remove), 行の種類]
      type RowType = 'Add' | 'Remove' | 'Normal';
      const hl_rows: [number, number, number, RowType][] = [];

      // 特定の行の種類を二分探索 -> index
      const bisectHLRows = (
        arr: [number, number, number, RowType][],
        lineNumber: number
      ): number => {
        let ok = 0;
        let ng = arr.length;
        while (ng - ok > 1) {
          const md = (ok + ng) >> 1;
          if (arr[md][0] <= lineNumber) {
            ok = md;
          } else {
            ng = md;
          }
        }
        return ok;
      };

      for (const diff of diffs) {
        code += diff.value;
        hl_rows.push([
          row,
          row_add,
          row_rem,
          diff.added ? 'Add' : diff.removed ? 'Remove' : 'Normal',
        ]);
        row += diff.count;
        if (diff.added) row_add += diff.count;
        if (diff.removed) row_rem += diff.count;
      }

      return (
        <SyntaxHighlighter
          language={props.language}
          style={atomDarkWithoutMargin}
          showLineNumbers
          wrapLines={true}
          lineProps={(lineNumber) => {
            const style: {
              display: string;
              backgroundColor?: string;
            } = { display: 'block' };
            const idx = bisectHLRows(hl_rows, lineNumber);
            const [, , , tp] = hl_rows[idx];
            if (tp === 'Add') {
              style.backgroundColor = '#16c79a88';
            } else if (tp === 'Remove') {
              style.backgroundColor = '#f1466888';
            }
            return { style };
          }}>
          {code}
        </SyntaxHighlighter>
      );
    }
    default: {
      return null;
    }
  }
};

export default SyntaxHighlighterWithDiff;
