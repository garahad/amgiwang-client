/** @jsx jsx */
import { withRouter, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { jsx } from '@emotion/core';
import { useMutation } from '@apollo/react-hooks';
import '../css/App.css';
import { useState } from 'react';
import { SET_SIDEBAR } from '../graphql/queries';
import { logoCss } from '../css/emotions';

type HeaderProps = {
  history: any;
};

function Header({ history }: HeaderProps) {
  const [setSidebar] = useMutation(SET_SIDEBAR);
  const [selected, setSelected] = useState<any[]>([]);

  return (
    <Layout.Header className="header">
      <div className="logo" css={logoCss}>
        <Link
          to="/"
          onClick={() => {
            setSidebar({ variables: { status: 'category' } });
            setSelected([]);
          }}
        >
          암기왕
        </Link>
      </div>

      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={selected}
        style={{ lineHeight: '64px' }}
      >
        {/* <Menu.Item key="1">문제 등록</Menu.Item> */}
        <Menu.Item
          key="2"
          onClick={() => {
            setSidebar({ variables: { status: 'category' } });
            setSelected(['2']);
            history.push('/');
          }}
        >
          카테고리별 문제 풀기
        </Menu.Item>
        <Menu.Item
          key="3"
          onClick={() => {
            setSidebar({ variables: { status: 'importance' } });
            setSelected(['3']);
            history.push('/');
          }}
        >
          중요도별 문제 풀기
        </Menu.Item>
        <Menu.Item
          key="4"
          onClick={() => {
            setSelected(['4']);
            history.push('/');
          }}
        >
          문제 검색
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
}

export default withRouter(Header);
