import React from 'react';
import ReactDOM from 'react-dom/client';

import { Layout } from 'components/Constants/Layout.styled';
import { GlobalStyle } from 'components/Constants/GlobalStyle';

import { App } from 'components/App/App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Layout>
      <GlobalStyle />
      <App />
    </Layout>
  </React.StrictMode>
);
