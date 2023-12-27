import React, { PropsWithChildren } from 'react';
import NavBar from './NavBar';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
