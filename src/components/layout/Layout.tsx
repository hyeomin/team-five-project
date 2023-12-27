import { PropsWithChildren } from 'react';
import Body from './Body';
import NavBar from './NavBar';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <NavBar />
      <Body>{children}</Body>
    </div>
  );
};

export default Layout;
