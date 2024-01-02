import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Body = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default Body;
