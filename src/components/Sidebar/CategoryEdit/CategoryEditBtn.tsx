import React from 'react';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

type CategoryEditBtnProps = {
  setEditing: Function;
};

const CategoryEditBtn = ({ setEditing }: CategoryEditBtnProps) => {
  return (
    <Button
      onClick={() => {
        setEditing(true);
      }}
      size="small"
    >
      <FontAwesomeIcon icon={faPen} size="sm" />
    </Button>
  );
};

export default CategoryEditBtn;
