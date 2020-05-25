import React from 'react';
import { Button } from 'antd';

type SubdomainCancelBtn = {
  setSubdomainInputs: any;
  subdomainInputs: any;
  idx: any;
};

const SubdomainCancelBtn = ({
  setSubdomainInputs,
  subdomainInputs,
  idx,
}: SubdomainCancelBtn) => {
  return (
    <Button
      onClick={() => {
        setSubdomainInputs(
          subdomainInputs.map((elme, elmKey) => {
            if (idx === elmKey) {
              return false;
            }
            return elme;
          }),
        );
      }}
    >
      취소
    </Button>
  );
};

export default SubdomainCancelBtn;
