import { isLoggedInState } from '@/recoil/atom';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import Login from '../Auth/Login';
import SingUp from '../Auth/SingUp';

const NavBar = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  return (
    <nav className='flex gap-[100px] justify-center items-center py-2 font-bebas text-xl'>
      <Link href='/'>HOME</Link>
      <Link href='/community'>COMMUNITY</Link>
      <Link href='/about'>ABOUT</Link>
      {!isLoggedIn && <SingUp />}
      <Login />
    </nav>
  );
};

export default NavBar;
