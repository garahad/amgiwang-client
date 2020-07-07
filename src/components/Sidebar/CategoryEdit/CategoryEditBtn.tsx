/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { sidebarEditBtnCss } from '../../../css/emotions';

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
      css={sidebarEditBtnCss}
    >
      <FontAwesomeIcon icon={faPen} size="sm" />
    </Button>
  );
};

export default CategoryEditBtn;
