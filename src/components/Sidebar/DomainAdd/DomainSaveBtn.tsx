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

type DomainSaveBtnProps = {
  newDomain: any;
  domains: any;
  addDomain: any;
  setCategoryAdded: any;
  addCategory: any;
};

const DomainSaveBtn = ({
  newDomain,
  domains,
  addDomain,
  setCategoryAdded,
  addCategory,
}: DomainSaveBtnProps) => {
  return (
    <Button
      onClick={() => {
        if (newDomain.length === 0) {
          alert('카테고리 이름은 1글자 이상이어야 합니다');
        } else if (domains.indexOf(newDomain) === -1) {
          addDomain(setCategoryAdded, addCategory, 1, newDomain);
        } else {
          alert('카테고리 이름 중복입니다');
        }
      }}
      size="small"
      css={inputBtnCss}
    >
      저장
    </Button>
  );
};

export default DomainSaveBtn;
