import { ReactNode, createContext, useContext, useState } from 'react';

type Props = {
  children: ReactNode;
};

type HeaderContextValue = {
  headerContent: ReactNode | null;
  setHeaderContent: (val: ReactNode) => void;
};

const HeaderContext = createContext<HeaderContextValue | null>(null);

const useHeader = () => {
  const context = useContext(HeaderContext);

  if (!context) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }

  return context;
};

export const HeaderProvider = ({ children }: Props) => {
  const [headerContent, setHeaderContent] = useState<ReactNode>(null);

  return (
    <HeaderContext.Provider value={{ headerContent, setHeaderContent }}>
      {children}
    </HeaderContext.Provider>
  );
};

export default useHeader;
