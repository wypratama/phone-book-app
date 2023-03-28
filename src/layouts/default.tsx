import { Outlet } from 'react-router-dom';
import Container from '~/components/common/Container';
import styled from '@emotion/styled';

const BaseLayout = styled.div`
  ${(props) => `
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100svh;
  background: darken(${props.theme.colors.background}, 70%);
  `}
`;

const LayoutDefault = () => {
  return (
    <BaseLayout>
      <Container>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '50px',
            paddingBottom: '50px',
          }}
        >
          <h1>Contact</h1>
        </div>
      </Container>
      <div
        css={(theme) => ({
          background: theme.colors.background,
          width: '100%',
          height: '100%',
          borderRadius: '10px 10px 0 0',
          padding: '16px',
        })}
      >
        <Outlet />
      </div>
    </BaseLayout>
  );
};

export default LayoutDefault;
