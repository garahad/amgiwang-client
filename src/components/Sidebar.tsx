import React from 'react';
import { Link } from 'react-router-dom';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

const { SubMenu } = Menu;
const { Sider } = Layout;

function Sidebar() {
  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <UserOutlined />
              영어 단어
            </span>
          }
        >
          <Menu.Item key="1">
            <Link to="/solve/영어단어/수능/1">수능</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/solve/영어단어/영어단어집/1">영어단어집</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/solve/영어단어/토익/1">토익</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <LaptopOutlined />
              의대 암기
            </span>
          }
        >
          <Menu.Item key="5">근골격</Menu.Item>
          <Menu.Item key="6">CNS</Menu.Item>
          <Menu.Item key="7">소아재활</Menu.Item>
          <Menu.Item key="8">보조기</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          title={
            <span>
              <NotificationOutlined />
              그외 암기
            </span>
          }
        >
          <Menu.Item key="9">코딩</Menu.Item>
          <Menu.Item key="10">투자</Menu.Item>
          <Menu.Item key="11">명언</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}

export default Sidebar;
