import React from 'react';
import { Button } from 'antd';

type SubdomainAddBtnProps = {
  setSubdomainInputs: Function;
  subdomainInputs: boolean[];
  idx: number;
  setDomainVisible: Function;
  domainVisible: boolean[];
  setCategoryAdded: Function;
};

const SubdomainAddBtn = ({
  setSubdomainInputs,
  subdomainInputs,
  idx,
  setDomainVisible,
  domainVisible,
  setCategoryAdded,
}: SubdomainAddBtnProps) => {
  return (
    <Button
      onClick={() => {
        setSubdomainInputs(
          subdomainInputs.map((elme, elmKey) => idx === elmKey),
        );
        setDomainVisible(
          domainVisible.map((elme, elmKey) => {
            if (idx === elmKey) {
              return true;
            }
            return elme;
          }),
        );
        setCategoryAdded(null);
      }}
    >
      +
    </Button>
  );
};

export default SubdomainAddBtn;
