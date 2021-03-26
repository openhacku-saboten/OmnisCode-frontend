import { Button } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import React from 'react';

export function UserIconImage(): JSX.Element {
  const userIconImage = localStorage.getItem('userIconImage');
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
        <img
          src={userIconImage}
          alt="画像"
          style={{ marginRight: '10px', borderRadius: '50%' }}
        />
      </>
    );
  } else {
    return <AccountCircle fontSize="large" style={{ marginRight: '10px' }} />;
  }
}
