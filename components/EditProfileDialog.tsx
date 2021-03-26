import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type Props = {
  userName: string;
  userProfile: string;
};

const EditProfileDialog: React.FC<Props> = (prop) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="edit-profile">プロフィール編集</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ユーザーネーム・プロフィールを編集できます。
          </DialogContentText>
          <TextField
            margin="dense"
            id="userName"
            label="User Name"
            value={nameValue}
            onChange={e => }
            fullWidth
          />
          <TextField
            margin="dense"
            id="userProfile"
            label="User Profile"
            value={profileValue}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditProfileDialog;
