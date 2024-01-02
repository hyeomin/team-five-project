import { PropsWithChildren } from 'react';
import Body from './Body';
import Footer from './Footer';
import NavBar from './NavBar';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='bg-main bg-full min-h-screen'>
      <NavBar />
      <Body>{children}</Body>
      <Footer />
    </div>
  );
};

export default Layout;
