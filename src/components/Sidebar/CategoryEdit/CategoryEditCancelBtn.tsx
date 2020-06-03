import React from 'react';
import { Button } from 'antd';

type CategoryEditCancelBtnProps = {
  setEditing: Function;
};

const CategoryEditCancelBtn = ({ setEditing }: CategoryEditCancelBtnProps) => {
  return (
    <Button
      onClick={() => {
        setEditing(false);
      }}
    >
      취소
    </Button>
  );
};

export default CategoryEditCancelBtn;
