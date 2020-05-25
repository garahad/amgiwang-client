import React from 'react';

type SubdomainAddInputProps = {
  inputEl: any;
  setNewSubdomain: Function;
  subDomains: any[];
  idx: number;
  addSubdomain: Function;
  subdomainInputs: boolean[];
  setSubdomainInputs: Function;
  categories: any[];
  addCategory: Function;
};

const SubdomainAddInput = ({
  inputEl,
  setNewSubdomain,
  subDomains,
  idx,
  addSubdomain,
  subdomainInputs,
  setSubdomainInputs,
  categories,
  addCategory,
}: SubdomainAddInputProps) => {
  return (
    <input
      type="text"
      ref={inputEl}
      placeholder="세부 카테고리 입력"
      style={{ marginLeft: '15px' }}
      onChange={(e) => setNewSubdomain(e.target.value)}
      onKeyDown={(e) => {
        // 아래 코드와 중복을 제거하는 문제
        if (e.keyCode === 13) {
          if ((e.target as HTMLInputElement).value.length === 0) {
            alert('subdomain은 1글자 이상이어야 합니다');
          } else if (
            subDomains[idx].indexOf((e.target as HTMLInputElement).value) !== -1
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
        }
      }}
    />
  );
};

export default SubdomainAddInput;
