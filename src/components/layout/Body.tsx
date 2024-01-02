import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Body = ({ children }: Props) => {
  return <div className='h-[100vh]'>{children}</div>;
};

export default Body;
