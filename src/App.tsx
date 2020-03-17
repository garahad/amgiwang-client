import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './components/Header';
import './css/App.css';
import Sidebar from './components/Sidebar';
import Content from './components/Content';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Layout>
          <Sidebar />
          <Content />
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
