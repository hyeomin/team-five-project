import React from 'react';
import Link from 'next/link';
import Login from '../Auth/Login';
import SingUp from '../Auth/SingUp';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from '@/recoil/atom';

const NavBar = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  return (
    <nav className='flex gap-[100px] justify-center items-center'>
      <Link href='/'>HOME</Link>
      <Link href='/community'>COMMUNITY</Link>
      <Link href='/about'>ABOUT</Link>
      {!isLoggedIn && <SingUp />}
      <Login />
    </nav>
  );
};

export default NavBar;
