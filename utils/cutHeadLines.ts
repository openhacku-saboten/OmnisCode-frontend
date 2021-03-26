// 先頭15行を切り取る
const cutHeadLines = (code: string): string => {
  const rows = code.split(/\n|\r\n/);
  return rows.slice(0, 15).join('\n');
};

export default cutHeadLines;
