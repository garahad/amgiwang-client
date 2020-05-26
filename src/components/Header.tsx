/** @jsx jsx */
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { css, jsx } from '@emotion/core';
import '../css/App.css';

const logoCss = css`
  color: white;
`;

function Header() {
  return (
    <Layout.Header className="header">
      <div className="logo" css={logoCss}>
        <Link to="/">암기왕</Link>
      </div>

      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[]}
        style={{ lineHeight: '64px' }}
      >
        {/* <Menu.Item key="1">문제 등록</Menu.Item> */}
        <Menu.Item key="2">카테고리별 문제 풀기</Menu.Item>
        <Menu.Item key="3">중요도별 문제 풀기</Menu.Item>
        <Menu.Item key="4">문제 검색</Menu.Item>
      </Menu>
    </Layout.Header>
  );
}

export default Header;
