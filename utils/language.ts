export const langs = [
  { id: 'csharp', title: 'C#' },
  { id: 'cpp', title: 'C++' },
  { id: 'php', title: 'PHP' },
  { id: 'perl', title: 'Perl' },
  { id: 'python', title: 'Python' },
  { id: 'java', title: 'Java' },
  { id: 'kotlin', title: 'Kotlin' },
  { id: 'swift', title: 'Swift' },
  { id: 'r', title: 'R' },
  { id: 'rust', title: 'Rust' },
  { id: 'go', title: 'Go' },
  { id: 'objective-c', title: 'Objective-C' },
  { id: 'javascript', title: 'JavaScript' },
  { id: 'typescript', title: 'TypeScript' },
];

export const id2ogp = (id: string): string => {
  if (id === 'objective-c') return 'objectivec';
  return id;
};
