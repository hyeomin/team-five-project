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
import { signInHndlr, signOutHndlr } from '@/pages/api/login';

export default function Login() {
  const [isUser, setIsUser] = React.useState(false);
  const [login, setLogin] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleCancel = () => setOpen(false);

  return (
    <React.Fragment>
      {isUser ? (
        <React.Fragment>
          {!login && (
            <Button variant='outlined' onClick={handleOpen}>
              Login
            </Button>
          )}
          {login && (
            <Button
              variant='outlined'
              onClick={signOutHndlr.bind(null, setLogin)}
            >
              Log out
            </Button>
          )}

          <Dialog open={open} onClose={handleCancel}>
            <DialogTitle>Login</DialogTitle>

            <DialogContent>
              {login ? (
                <DialogContentText>
                  {login ? '로그인 성공' : '로그아웃 성공'}
                </DialogContentText>
              ) : (
                <React.Fragment>
                  <DialogContentText>
                    M5MENTOM에 오신 것을 환영합니다.
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
                </React.Fragment>
              )}
            </DialogContent>
            <DialogActions>
              <button onClick={handleCancel}>취소</button>
              {login ? (
                <button onClick={handleCancel}>확인</button>
              ) : (
                <button
                  onClick={signInHndlr.bind(
                    null,
                    email,
                    password,
                    setLogin,
                    setEmail,
                    setPassword,
                  )}
                >
                  login
                </button>
              )}
            </DialogActions>
          </Dialog>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Button variant='outlined' onClick={handleOpen}>
            Join
          </Button>
          <Dialog open={open} onClose={handleCancel}>
            <DialogTitle>Join </DialogTitle>
          </Dialog>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
