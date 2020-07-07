/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Button } from 'antd';
import { sidebarInputBtnCss } from '../../../css/emotions';

type CategoryEditCancelBtnProps = {
  setEditing: Function;
};

const CategoryEditCancelBtn = ({ setEditing }: CategoryEditCancelBtnProps) => {
  return (
    <Button
      onClick={() => {
        setEditing(false);
      }}
      size="small"
      css={sidebarInputBtnCss}
    >
      취소
    </Button>
  );
};

export default CategoryEditCancelBtn;
