import React from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import { useQuery } from '@apollo/react-hooks';

import { GET_CATEGORIES } from '../graphql/queries';

const { SubMenu } = Menu;
const { Sider } = Layout;

function Sidebar() {
  const { data: dataCategories } = useQuery(GET_CATEGORIES, {
    variables: { id: 1 },
  });

  let categories;
  if (dataCategories && dataCategories.getCategories) {
    const categoryDomains = Array.from(
      new Set(dataCategories.getCategories.map((elm) => elm.domain)),
    );
    const subDomains = categoryDomains.map((): any[] => []);
    dataCategories.getCategories.forEach((elm) => {
      const domainIdx = categoryDomains.indexOf(elm.domain);
      subDomains[domainIdx].push(elm.subdomain);
    });
    categories = categoryDomains.map((elm, key) => {
      return { [elm as any]: subDomains[key] };
      // ts 이해 부족
    });
  }

  if (categories && categories.length > 0) {
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
              {Object.values<any>(elm)[0]!.map((ele) => (
                // ts 이해 부족
                <Menu.Item key={ele}>
                  <Link to={`/solve/${Object.keys(elm)[0]}/${ele}/1`}>
                    {ele}
                  </Link>
                </Menu.Item>
              ))}
            </SubMenu>
          ))}
        </Menu>
      </Sider>
    );
  }
  return null;
}

export default Sidebar;
