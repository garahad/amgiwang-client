import React from 'react';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import DomainSaveBtn from './DomainSaveBtn';

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
          <span>
            <UserOutlined />
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
            />
            <DomainSaveBtn {...props} />
            <Button onMouseDown={() => setCategoryAdded(null)}>취소</Button>
          </span>,
        );
        setSubdomainInputs(subdomainInputs.map(() => false));
      }}
    >
      +
    </Button>
  );
};

export default DomainAddBtn;
