/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Button } from 'antd';
import { sidebarInputBtnCss } from '../../../css/emotions';

type SubdomainAddCancelBtn = {
  cancelInput: Function;
};

const SubdomainAddCancelBtn = ({ cancelInput }: SubdomainAddCancelBtn) => {
  return (
    <Button
      onMouseDown={() => {
        cancelInput();
      }}
      size="small"
      css={sidebarInputBtnCss}
    >
      취소
    </Button>
  );
};

export default SubdomainAddCancelBtn;
