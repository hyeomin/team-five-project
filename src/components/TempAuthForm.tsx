import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient(
  'https://purncozcritbkwxihbin.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1cm5jb3pjcml0Ymt3eGloYmluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM2NjU3NjgsImV4cCI6MjAxOTI0MTc2OH0.doV8KUqH2JfsxH_HtWo4fc3wp4NmZwm9wfqW09lAtPc',
);

const TempAuthForm = () => {
  const [id, setId] = useState('');
  const [nick, setNick] = useState('');
  const [pw, setPw] = useState('');
  const [user, setUser] = useState('');
  const [userNick, setUserNick] = useState('');

  //회원가입
  const signUpHndlr = async () => {
    console.log('이것도 연결됨');
    const { data, error } = await supabase.auth.signUp({
      email: id,
      password: pw,
      options: {
        data: {
          nickname: nick,
        },
      },
    });
  };

  //로그인
  const signInHndlr = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: id,
      password: pw,
    });
    console.log('데이터', data, '에러', error);
  };

  //소셜로그인
  const signInWithKakao = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
    });
    console.log('카카오로그인정보', data);
  };

  //로그아웃
  const signOutHndlr = async () => {
    const { error } = await supabase.auth.signOut();
    console.log('에러', error);
  };

  //조회
  const getCurrentSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    console.log('데이터', data, '에러', error);
    if (!data.session) {
      setUser('로그인 상태가 아님');
    }
    if (data.session) {
      setUser(data.session?.user.email as string);
      setUserNick(data.session?.user.user_metadata?.nickname as string);
    }
  };

  return (
    <>
      <form onSubmit={signInHndlr}>
        <input
          type='text'
          placeholder='id'
          onChange={(e) => setId(e.target.value)}
          value={id}
          className='border-2'
        />
        <br />
        <br />
        <input
          type='password'
          placeholder='pw'
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className='border-2'
        />
        <br />
        <br />
        <input
          type='text'
          placeholder='닉네임'
          onChange={(e) => setNick(e.target.value)}
          value={nick}
          className='border-2'
        />
        <br />
        <button type='submit' className='border-solid border-2 border-sky-500'>
          로그인
        </button>
        <button
          type='button'
          onClick={signInWithKakao}
          className='border-solid border-2 border-sky-500'
        >
          소셜 로그인
        </button>
        <br />
      </form>
      <button
        onClick={signOutHndlr}
        className='border-solid border-2 border-sky-500'
      >
        로그아웃
      </button>
      <br />
      <button
        type='submit'
        onClick={signUpHndlr}
        className='border-solid border-2 border-sky-500'
      >
        회원가입
      </button>
      <br />
      <button
        type='submit'
        onClick={getCurrentSession}
        className='border border-sky-500'
      >
        로그인 세션 조회
      </button>
      <p className='border border-sky-500'>
        현재 로그인 되어 있는 사람 : {user}
      </p>
      <p className='border border-sky-500'>
        현재 로그인 되어 있는 사람의 닉네임 : {userNick}
      </p>
    </>
  );
};

export default TempAuthForm;
