import { PropsWithChildren } from 'react';
import Body from './Body';
import Footer from './Footer';
import NavBar from './NavBar';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='bg-main'>
      <NavBar />
      <Body>{children}</Body>
      <Footer />
    </div>
  );
};

export default Layout;
