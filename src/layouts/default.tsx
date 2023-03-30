import { Outlet } from 'react-router-dom';
import Container from '~/components/common/Container';
import styled from '@emotion/styled';
import useHeader from '~/hooks/useHeader';
import useIndexedDB from '~/hooks/useIndexedDb';

const LayoutDefault = () => {
  // const { add } = useIndexedDB('phonebook', 'favorite');
  const { headerContent: Header } = useHeader();
  return (
    <BaseLayout>
      <Container>
        <LayoutHeader>{Header}</LayoutHeader>
      </Container>
      <div
        css={(theme) => ({
          background: theme.colors.background,
          width: '100%',
          height: '100%',
          borderRadius: '10px 10px 0 0',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
        })}
      >
        <Outlet />
        <div style={{ height: '16px' }}> </div>
      </div>
    </BaseLayout>
  );
};

const BaseLayout = styled.div`
  ${(props) => `
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100svh;
  background: ${props.theme.colors.nord0};
  `}
`;

const LayoutHeader = styled.header`
  ${({ theme }) => `
    
  `}
`;

export default LayoutDefault;
