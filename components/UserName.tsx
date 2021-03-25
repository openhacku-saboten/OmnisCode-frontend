export function UserName(): JSX.Element {
  const userName = localStorage.getItem('userName');
  const idToken = localStorage.getItem('Token');
  if (userName) {
    return (
      <p style={{ fontSize: 'medium' }}>
        <a href={'/user/' + idToken}>{userName}</a>
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
