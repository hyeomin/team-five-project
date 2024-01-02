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
import { signInHndlr, signOutHndlr } from '@/pages/api/login';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isLoggedInState } from '@/recoil/atom';

export default function Login() {
  const [isUser, setIsUser] = React.useState(false);
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

  const [validation, setValidation] = React.useState({
    email: {
      isValid: false,
      message: '이메일이 올바른 형식이 아닙니다.',
    },
    password: {
      isValid: false,
      message: '비밀번호는 6자 이상 적어주세요.',
    },
  });

  const signInHelperFn = async () => {
    await signInHndlr(email, password);

    setLogin(true);
    setEmail('');
    setPassword('');
    setIsLoggedIn(true);
  };
  const signOutHelperFn = async () => {
    await signOutHndlr();
    setLogin(false);
    // setEmail('');
    // setPassword('');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);

    const isPasswordValid = password.length >= 6;

    setValidation((prevValidation) => ({
      ...prevValidation,
      email: {
        isValid: isEmailValid,
        message: isEmailValid
          ? '이메일이 일치합니다.'
          : '이메일이 일치하지 않습니다.',
      },
      password: {
        isValid: isPasswordValid,
        message: isPasswordValid
          ? '비밀번호가 일치합니다.'
          : '비밀번호를 일치하지 않습니다.',
      },
    }));
  }, [email, password]);

  const isEmailValid = validation.email.isValid;
  const isPasswordValid = validation.password.isValid;

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
            onClick={
              // signOutHndlr.bind(null, setLogin)
              signOutHelperFn
            }
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
                  error={!isEmailValid}
                  helperText={validation.email.message}
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
                  error={!isPasswordValid}
                  helperText={validation.password.message}
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
                onClick={
                  //   signInHndlr.bind(
                  //   null,
                  //   email,
                  //   password,
                  //   setLogin,
                  //   setEmail,
                  //   setPassword,
                  // )
                  signInHelperFn
                }
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
