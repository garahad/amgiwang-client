import React from 'react';
import { Layout, Breadcrumb } from 'antd';

type QuestionProps = {
  match: any;
};

function Question({ match }: QuestionProps) {
  return (
    <Layout style={{ padding: '0 24px 24px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>{match.params.domain}</Breadcrumb.Item>
        <Breadcrumb.Item>{match.params.subdomain}</Breadcrumb.Item>
      </Breadcrumb>
      <Layout.Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <div>{match.params.domain}</div>
        <div>{match.params.subdomain}</div>
      </Layout.Content>
    </Layout>
  );
}

export default Question;
