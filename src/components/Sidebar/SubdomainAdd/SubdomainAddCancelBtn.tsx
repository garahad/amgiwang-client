import React from 'react';
import { Button } from 'antd';

type SubdomainAddCancelBtn = {
  cancelInput: Function;
};

const SubdomainAddCancelBtn = ({ cancelInput }: SubdomainAddCancelBtn) => {
  return (
    <Button
      onMouseDown={() => {
        cancelInput();
      }}
    >
      취소
    </Button>
  );
};

export default SubdomainAddCancelBtn;
