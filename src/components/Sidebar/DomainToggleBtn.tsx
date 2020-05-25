import React from 'react';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

type DomainToggleBtnProps = {
  setDomainVisible: Function;
  domainVisible: boolean[];
  idx: number;
  setSubdomainInputs: Function;
  subdomainInputs: boolean[];
  elm: any;
};

const DomainToggleBtn = ({
  setDomainVisible,
  domainVisible,
  idx,
  setSubdomainInputs,
  subdomainInputs,
  elm,
}: DomainToggleBtnProps) => {
  return (
    <Button
      onClick={() => {
        setDomainVisible(
          domainVisible.map((elme, elmKey) => {
            if (idx === elmKey) {
              return !elme;
            }
            return elme;
          }),
        );
        setSubdomainInputs(
          subdomainInputs.map((el, elKey) => {
            if (idx === elKey && el) {
              return false;
            }
            return el;
          }),
        );
      }}
    >
      <UserOutlined />
      {Object.keys(elm)[0]}
    </Button>
  );
};

export default DomainToggleBtn;
