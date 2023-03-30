import { ReactNode } from 'react';

const Icon = ({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <span
      className={`material-icons ${className}`}
      onClick={onClick}
      onKeyUp={() => {}}
    >
      {children}
    </span>
  );
};

export default Icon;
