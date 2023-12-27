import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import React from 'react';

export default function Login() {
  const [login, setLogin] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleCancel = () => setOpen(false);
  const isLoggedinBtn = () => {
    setLogin(!login);
  };

  return (
    <React.Fragment>
      <Button variant='outlined' onClick={handleOpen}>
        {login ? '로그아웃' : '로그인'}
      </Button>
      {login ? (
        <Dialog open={open} onClose={handleCancel}>
          <DialogTitle>로그인</DialogTitle>
          <DialogContent>
            <DialogContentText>로그아웃 하시겠습니까?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <button onClick={handleCancel}>취소</button>
            <button onClick={isLoggedinBtn}>로그아웃</button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog open={open} onClose={handleCancel}>
          <DialogTitle>로그인</DialogTitle>
          <DialogContent>
            <DialogContentText>
              안녕하세요. M5MENTOM에 오신 것을 환영합니다.
            </DialogContentText>
            <TextField
              autoFocus
              margin='dense'
              id='email'
              label='Email'
              type='email'
              fullWidth
              variant='standard'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              autoFocus
              margin='dense'
              id='password'
              label='Password'
              type='password'
              fullWidth
              variant='standard'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <button onClick={handleCancel}>취소</button>
            <button onClick={isLoggedinBtn}>로그인</button>
          </DialogActions>
        </Dialog>
      )}
    </React.Fragment>
  );
}
