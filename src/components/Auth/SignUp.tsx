import { signUpHndlr } from '@/pages/api/login';
import { isLoggedInState } from '@/recoil/atom';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

export default function Login() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [nickname, setNickname] = React.useState('');

  const [emailMsg, setEmailMsg] = React.useState('');
  const [pwdMsg, setPwdMsg] = React.useState('');
  const [nicknameMsg, setNicknameMsg] = React.useState('');

  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const validateEmail = (email: string) => {
    return email
      .toLowerCase()
      .match(
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
      );
  };

  const validatePwd = (password: string) => {
    return password
      .toLowerCase()
      .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,15}$/);
  };

  const validateNickname = (nickname: string) => {
    return nickname.toLowerCase().match(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|].{2,8}$/);
  };

  const isEmailValid = validateEmail(email);
  const isPwdValid = validatePwd(password);
  const isNicknameValid = validateNickname(nickname);

  // 이메일 유효성 검사
  const onChangeEmail = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const currEmail = e.target.value;
      setEmail(currEmail);

      if (!validateEmail(currEmail)) {
        setEmailMsg('이메일 형식이 올바르지 않습니다');
      } else {
        setEmailMsg('올바른 이메일 형식입니다.');
      }
    },
    [],
  );

  // 비밀번호 유효성 검사
  const onChangePwd = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const currPwd = e.target.value;
      setPassword(currPwd); // Update the state with the correct value

      if (!validatePwd(currPwd)) {
        setPwdMsg('영문, 숫자, 특수 기호 조합으로 6자리 이상 입력해주세요.');
      } else {
        setPwdMsg('안전한 비밀번호 입니다.');
      }
    },
    [],
  );

  // 닉네임 유효성 검사
  const onChangeNickname = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const currNickname = e.target.value;
      setNickname(currNickname);

      if (!validateNickname(currNickname)) {
        setNicknameMsg('2글자 이상 8글자 미만으로 입력해주세요.');
      } else {
        setNicknameMsg('올바른 닉네임 입니다.');
      }
    },
    [],
  );

  const singUpHelperFn = async () => {
    try {
      // signUpHndlr 함수가 성공적으로 가입되었는지 여부를 확인
      await signUpHndlr(email, password, nickname);
      setIsLoggedIn(true);
    } catch (error) {
      // 가입이 실패한 경우에 대한 처리 (에러 핸들링 등)
      console.error('회원가입 실패:', error);
    }
  };

  return (
    <React.Fragment>
      <button className='text-white text-xl font-bebas' onClick={handleOpen}>
        Join
      </button>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Join </DialogTitle>
        <DialogContent>
          <DialogContentText>
            M5MENTOM에 오신 것을 환영합니다.
          </DialogContentText>
          <TextField
            fullWidth
            autoFocus
            margin='dense'
            id='email'
            label='Email'
            type='email'
            variant='standard'
            error={!isEmailValid}
            helperText={emailMsg}
            value={email}
            onChange={(e) => onChangeEmail(e)}
          />
          <TextField
            fullWidth
            autoFocus
            margin='dense'
            id='password'
            label='Password'
            type='password'
            variant='standard'
            error={!isPwdValid}
            helperText={pwdMsg}
            value={password}
            onChange={(e) => onChangePwd(e)}
          />
          <TextField
            fullWidth
            autoFocus
            margin='dense'
            id='nickname'
            label='닉네임'
            type='text'
            variant='standard'
            error={!isNicknameValid}
            helperText={nicknameMsg}
            value={nickname}
            onChange={(e) => onChangeNickname(e)}
          />
        </DialogContent>
        <DialogActions className='flex justify-end pl-6'>
          <button
            className='mr-2 bg-gray-200 w-14 h-8 text-black text-xs'
            onClick={handleCancel}
          >
            취소
          </button>
          <button
            className='mr-4 bg-violet-900 w-14 h-8 text-white text-xs'
            onClick={singUpHelperFn}
          >
            join
          </button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
