export function UserName(): JSX.Element {
  const userName = localStorage.getItem('userName');
  const userId = localStorage.getItem('userId');
  if (userName) {
    return (
      <p style={{ fontSize: 'medium' }}>
        <a href={'/user/' + userId}>{userName}</a>
      </p>
    );
  } else {
    return (
      <p style={{ fontSize: 'medium' }}>
        <a href="/login">ログイン</a>
      </p>
    );
  }
}
