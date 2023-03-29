import React from 'react';
import ReactDOM from 'react-dom/client';
import { Global, ThemeProvider } from '@emotion/react';
import { globalStyle, theme } from './styles';
import { ApolloProvider } from '@apollo/client';
import client from '~/configs/graphql';
import { RouterProvider } from 'react-router-dom';
import router from '~/routers';
import { HeaderProvider } from './hooks/useHeader';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Global styles={globalStyle} />
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <HeaderProvider>
          <RouterProvider router={router} />
        </HeaderProvider>
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>
);
