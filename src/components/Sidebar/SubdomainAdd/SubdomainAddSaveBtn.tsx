import React from 'react';
import { Button } from 'antd';

type SubdomainAddSaveBtnProps = {
  newSubdomain: string;
  allSubDomains: any[];
  addSubdomain: Function;
  addCategory: Function;
  categories: any[];
  idx: number;
  setSubdomainInputs: Function;
  subdomainInputs: boolean[];
};

const SubdomainAddSaveBtn = ({
  newSubdomain,
  allSubDomains,
  addSubdomain,
  addCategory,
  categories,
  idx,
  setSubdomainInputs,
  subdomainInputs,
}: SubdomainAddSaveBtnProps) => {
  return (
    <Button
      onClick={() => {
        if (newSubdomain.length === 0) {
          alert('subdomain은 1글자 이상이어야 합니다');
        } else if (allSubDomains[idx].indexOf(newSubdomain) !== -1) {
          alert('subdomain 이름 중복입니다');
        } else {
          addSubdomain(
            addCategory,
            1,
            categories,
            idx,
            newSubdomain,
            setSubdomainInputs,
            subdomainInputs,
          );
        }
      }}
      size="small"
    >
      저장
    </Button>
  );
};

export default SubdomainAddSaveBtn;
