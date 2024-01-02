import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useEffect } from 'react';
import { signInHndlr, signOutHndlr, supabase } from '@/pages/api/login';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '@/recoil/atom';

export default function Login() {
  const [fetchError, setFetchError] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<any[] | null>(null);

  const [login, setLogin] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const signInHelperFn = async () => {
    await signInHndlr(email, password);
    setLogin(true);
    setIsLoggedIn(true);
  };

  const signOutHelperFn = async () => {
    await signOutHndlr();
    setLogin(false);
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <React.Fragment>
        {!isLoggedIn && (
          <Button
            onClick={handleOpen}
            className='text-base text-white font-sans'
          >
            Login
          </Button>
        )}
        {isLoggedIn && (
          <Button
            onClick={signOutHelperFn}
            className='text-base text-white font-sans'
          >
            Log out
          </Button>
        )}

        <Dialog open={open} onClose={handleCancel}>
          <DialogTitle>Login</DialogTitle>

          <DialogContent>
            {login ? (
              <DialogContentText className='w-64'>
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
            {login ? (
              <button
                onClick={handleCancel}
                className='mr-4 bg-violet-900 w-14 h-8 text-white text-xs'
              >
                확인
              </button>
            ) : (
              <button
                onClick={signInHelperFn}
                className='mr-4 bg-violet-900 w-14 h-8 text-white text-xs'
              >
                login
              </button>
            )}
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </React.Fragment>
  );
}
