/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const btnCss = css`
  border-radius: 5px;
  border: none;
  color: #999999;
  background-color: #f2eee6;
  margin-right: 1px;
  &:hover {
    color: #999999;
    background-color: #f18f6d;
  }
`;

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
      css={btnCss}
    >
      <FontAwesomeIcon icon={faPen} size="sm" />
    </Button>
  );
};

export default CategoryEditBtn;
