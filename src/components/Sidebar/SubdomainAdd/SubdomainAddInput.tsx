import React from 'react';
import SubdomainAddSaveBtn from './SubdomainAddSaveBtn';
import SubdomainAddCancelBtn from './SubdomainAddCancelBtn';

type SubdomainAddInputProps = {
  inputEl: any;
  setNewSubdomain: Function;
  allSubDomains: any[];
  idx: number;
  addSubdomain: Function;
  subdomainInputs: boolean[];
  setSubdomainInputs: Function;
  categories: any[];
  addCategory: Function;
  newProps: any;
};

const SubdomainAddInput = ({
  inputEl,
  setNewSubdomain,
  allSubDomains,
  idx,
  addSubdomain,
  subdomainInputs,
  setSubdomainInputs,
  categories,
  addCategory,
  newProps,
}: SubdomainAddInputProps) => {
  const saveInput = (e) => {
    if ((e.target as HTMLInputElement).value.length === 0) {
      alert('subdomain은 1글자 이상이어야 합니다');
    } else if (
      allSubDomains[idx].indexOf((e.target as HTMLInputElement).value) !== -1
    ) {
      alert('subdomain 이름 중복입니다');
    } else {
      addSubdomain(
        addCategory,
        1,
        categories,
        idx,
        (e.target as HTMLInputElement).value,
        setSubdomainInputs,
        subdomainInputs,
      );
    }
  };

  const cancelInput = () => {
    setSubdomainInputs(
      subdomainInputs.map((elme, elmKey) => {
        if (idx === elmKey) {
          return false;
        }
        return elme;
      }),
    );
  };

  return (
    <>
      <input
        type="text"
        ref={inputEl}
        placeholder="세부 카테고리 입력"
        style={{ marginLeft: '15px' }}
        onChange={(e) => setNewSubdomain(e.target.value)}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            saveInput(e);
          } else if (e.keyCode === 27) {
            cancelInput();
          }
        }}
        onBlur={(e) => saveInput(e)}
      />
      <SubdomainAddSaveBtn {...newProps} />
      <SubdomainAddCancelBtn cancelInput={cancelInput} />
    </>
  );
};

export default SubdomainAddInput;
