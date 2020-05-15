/** @jsx jsx */
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { Layout } from 'antd';
import { css, jsx } from '@emotion/core';
import Header from './components/Header';
import './css/App.css';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Solve from './pages/Solve';
import NotFound from './pages/NotFound';
import client from './graphql/apollo';
import Register from './pages/Register';

const wrapper = css`
  height: 100vh;
`;

const footerCss = css`
  text-align: center;
  background-color: #999999;
`;

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Layout css={wrapper}>
          <Header />
          <Layout>
            <Sidebar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/register/:domain/:subdomain" component={Register} />
              <Route
                path="/solve/:domain/:subdomain/:qNumber"
                component={Solve}
              />
              <Route component={NotFound} />
            </Switch>
          </Layout>
          <Layout.Footer css={footerCss}>
            암기왕 ©2020 Created by 용크셔
          </Layout.Footer>
        </Layout>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
