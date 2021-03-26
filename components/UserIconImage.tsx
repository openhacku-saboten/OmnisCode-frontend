import { Button, Link } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import React from 'react';

export function UserIconImage(): JSX.Element {
  const userIconImage = localStorage.getItem('userIconImage');
  const userId = localStorage.getItem('userId');
  if (userIconImage) {
    return (
      <>
        <Button
          variant="contained"
          href="/post/new"
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            backgroundColor: '#e9f6fe',
            borderRadius: 20,
            margin: 5,
          }}>
          投稿
        </Button>
        <Link href={'/user/' + userId}>
          <img
            src={userIconImage}
            alt="画像"
            style={{ marginRight: '10px', borderRadius: '50%' }}
          />
        </Link>
      </>
    );
  } else {
    return <AccountCircle fontSize="large" style={{ marginRight: '10px' }} />;
  }
}
