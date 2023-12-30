import React from 'react';
import Link from 'next/link';
import Login from '../Auth/Login';
import SingUp from '../Auth/SingUp';

const NavBar = () => {
  return (
    <nav className='flex gap-[100px] justify-center'>
      <Link href='/'>HOME</Link>
      <Link href='/community'>COMMUNITY</Link>
      <Link href='/about'>ABOUT</Link>
      <SingUp />
      <Login />
    </nav>
  );
};

export default NavBar;
