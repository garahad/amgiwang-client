import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './components/Header';
import './css/App.css';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Question from './pages/Question';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Layout>
          <Sidebar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/solve/:domain/:subdomain" component={Question} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
