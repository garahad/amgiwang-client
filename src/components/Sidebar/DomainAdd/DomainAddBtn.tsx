/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Button } from 'antd';
import DomainSaveBtn from './DomainSaveBtn';

const oneDomainCss = css`
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 20px;
`;
const domainUl = css`
  list-style-type: disc;
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
                style={{ width: '50%' }}
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
              />
              &nbsp;
              <DomainSaveBtn {...props} />
              <Button onMouseDown={() => setCategoryAdded(null)} size="small">
                취소
              </Button>
            </li>
          </ul>,
        );
        setSubdomainInputs(subdomainInputs.map(() => false));
      }}
    >
      +
    </Button>
  );
};

export default DomainAddBtn;
