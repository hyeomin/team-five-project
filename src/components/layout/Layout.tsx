import { PropsWithChildren } from 'react';
import Body from './Body';
import Footer from './Footer';
import NavBar from './NavBar';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex flex-col justify-between bg-main bg-full min-h-screen'>
      <div>
        <NavBar />
        <Body>{children}</Body>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
