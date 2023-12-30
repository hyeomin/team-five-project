import React from 'react';
import Link from 'next/link';
import Login from '../Auth/Login';

const NavBar = () => {
  return (
    <nav className='flex gap-[100px] justify-center items-center'>
      <Link href='/'>HOME</Link>
      <Link href='/community'>COMMUNITY</Link>
      <Link href='/about'>ABOUT</Link>
      <Login />
    </nav>
  );
};

export default NavBar;
