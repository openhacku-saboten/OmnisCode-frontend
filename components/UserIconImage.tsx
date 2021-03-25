import AccountCircle from '@material-ui/icons/AccountCircle';

export function UserIconImage(): JSX.Element {
  const userIconImage = localStorage.getItem('userIconImage');
  if (userIconImage) {
    return (
      <img
        src={userIconImage}
        alt="画像"
        style={{ marginRight: '10px', borderRadius: '50%' }}
      />
    );
  } else {
    return <AccountCircle fontSize="large" style={{ marginRight: '10px' }} />;
  }
}
