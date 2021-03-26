const zeroPadding = (s: number, len: number): string => {
  return ('0'.repeat(len) + s).slice(-len);
};

export default zeroPadding;
