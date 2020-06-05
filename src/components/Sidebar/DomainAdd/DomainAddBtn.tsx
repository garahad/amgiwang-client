/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Button } from 'antd';
import DomainSaveBtn from './DomainSaveBtn';

const oneDomainCss = css`
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 18px;
`;
const domainUl = css`
  list-style-type: disc;
`;
const buttonCss = css`
  border: none;
  border-radius: 0px;
  color: white;
  background-color: #95bff2;
  &:hover {
    background-color: #5075af;
    color: white;
  }
`;
const inputBtnCss = css`
  border-radius: 5px;
  border: none;
  color: black;
  background-color: #f2eee6;
  &:hover {
    color: black;
    background-color: #f18f6d;
  }
`;
const inputCss = css`
  width: 50%;
  &:focus {
    outline: 0.5px solid #999;
    border: none;
  }
`;

type DomainAddBtnProps = {
  setCategoryAdded: Function;
  inputEl: any;
  setNewDomain: Function;
  domains: string[];
  addDomain: Function;
  addCategory: Function;
  setSubdomainInputs: Function;
  subdomainInputs: boolean[];
  props: any;
};

const DomainAddBtn = ({
  setCategoryAdded,
  inputEl,
  setNewDomain,
  domains,
  addDomain,
  addCategory,
  setSubdomainInputs,
  subdomainInputs,
  props,
}: DomainAddBtnProps) => {
  const saveInput = (e) => {
    if ((e.target as HTMLInputElement).value.length === 0) {
      alert('카테고리 이름은 1글자 이상이어야 합니다');
    } else if (domains.indexOf((e.target as HTMLInputElement).value) === -1) {
      addDomain(
        setCategoryAdded,
        addCategory,
        1,
        (e.target as HTMLInputElement).value,
      );
    } else {
      alert('카테고리 이름 중복입니다');
    }
  };

  return (
    <Button
      onClick={() => {
        setCategoryAdded(
          <ul css={domainUl}>
            <li css={oneDomainCss}>
              <input
                ref={inputEl}
                type="text"
                placeholder="카테고리 입력"
                onChange={(e) => setNewDomain(e.target.value)}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    saveInput(e);
                  } else if (e.keyCode === 27) {
                    setCategoryAdded(null);
                  }
                }}
                onBlur={(e) => saveInput(e)}
                css={inputCss}
              />
              &nbsp;
              <DomainSaveBtn {...props} />
              <Button
                onMouseDown={() => setCategoryAdded(null)}
                size="small"
                css={inputBtnCss}
              >
                취소
              </Button>
            </li>
          </ul>,
        );
        setSubdomainInputs(subdomainInputs.map(() => false));
      }}
      css={buttonCss}
      // type="primary"
    >
      +
    </Button>
  );
};

export default DomainAddBtn;
