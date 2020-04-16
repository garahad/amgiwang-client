import React from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import { categories } from '../fakeData';

const { SubMenu } = Menu;
const { Sider } = Layout;

function Sidebar() {
  return (
    <Sider width={200} className="site-layout-background">
      <Button>+</Button>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        {categories.map((elm, key) => (
          <SubMenu
            key={key}
            title={
              <span>
                <UserOutlined />
                {Object.keys(elm)[0]}
              </span>
            }
          >
            {Object.values(elm)[0]!.map((ele) => (
              <Menu.Item key={ele}>
                <Link to={`/solve/${Object.keys(elm)[0]}/${ele}/1`}>{ele}</Link>
              </Menu.Item>
            ))}
          </SubMenu>
        ))}
      </Menu>
    </Sider>
  );
}

export default Sidebar;
