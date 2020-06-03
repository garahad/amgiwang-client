import React from 'react';
import { Button } from 'antd';

type SubdomainAddCancelBtn = {
  setSubdomainInputs: any;
  subdomainInputs: any;
  idx: any;
};

const SubdomainAddCancelBtn = ({
  setSubdomainInputs,
  subdomainInputs,
  idx,
}: SubdomainAddCancelBtn) => {
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

export default SubdomainAddCancelBtn;
