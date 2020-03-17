import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import English from '../pages/English';
import NotFound from '../pages/NotFound';

function Content() {
  return (
    <Layout style={{ padding: '0 24px 24px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Layout.Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/english" component={English} />
          <Route component={NotFound} />
        </Switch>
      </Layout.Content>
    </Layout>
  );
}

export default Content;
