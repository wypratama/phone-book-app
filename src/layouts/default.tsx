import { Outlet, useNavigation } from 'react-router-dom';
import Container from '~/components/common/Container';
import styled from '@emotion/styled';
import useHeader from '~/hooks/useHeader';

const LayoutDefault = () => {
  const { headerContent: Header } = useHeader();

  return (
    <BaseLayout>
      <Container size='sm'>
        <LayoutHeader>{Header}</LayoutHeader>
      </Container>
      <Container
        size='sm'
        css={(theme) => ({
          background: theme.colors.background,
          flex: 1,
          width: '100%',
          height: '100%',
          borderRadius: '10px 10px 0 0',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        })}
      >
        <Outlet />
        <div style={{ height: '16px' }}> </div>
      </Container>
    </BaseLayout>
  );
};

const BaseLayout = styled.div`
  ${(props) => `
  display: flex;
  flex-direction: column;
  min-width: 100%;
  min-height: 100svh;
  background: ${props.theme.colors.nord0};
  `}
`;

const LayoutHeader = styled.header`
  ${({ theme }) => `
    
  `}
`;

export default LayoutDefault;
