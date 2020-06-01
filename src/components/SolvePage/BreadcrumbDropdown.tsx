import React from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

type BreadcrumbDropdownProps = {
  domains: any;
  setNowDomain: any;
  nowDomain: any;
};

const BreadcrumbDropdown = ({
  domains,
  setNowDomain,
  nowDomain,
}: BreadcrumbDropdownProps) => {
  const domainMenu = (
    <Menu>
      {domains
        ? domains.map((elm, key) => (
            <Menu.Item key={key}>
              <span onClick={() => setNowDomain(elm)}>{elm}</span>
            </Menu.Item>
          ))
        : null}
    </Menu>
  );

  return (
    <Dropdown overlay={domainMenu}>
      <span className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        {nowDomain} <DownOutlined />
      </span>
    </Dropdown>
  );
};

export default BreadcrumbDropdown;
