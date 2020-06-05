/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Button } from 'antd';

const inputBtnCss = css`
  border-radius: 5px;
  border: none;
  color: black;
  background-color: #f2eee6;
  margin-right: 1px;
  &:hover {
    color: black;
    background-color: #f18f6d;
  }
`;

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
      css={inputBtnCss}
    >
      취소
    </Button>
  );
};

export default CategoryEditCancelBtn;
