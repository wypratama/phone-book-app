import { ReactNode } from 'react';

const Icon = ({ children }: { children: ReactNode }) => {
  return <span className='material-icons'>{children}</span>;
};

export default Icon;
