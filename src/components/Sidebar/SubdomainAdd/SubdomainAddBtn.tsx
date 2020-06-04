import React from 'react';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

type SubdomainAddBtnProps = {
  setSubdomainInputs: Function;
  subdomainInputs: boolean[];
  idx: number;
  setDomainVisible: Function;
  domainVisible: boolean[];
  setCategoryAdded: Function;
};

const SubdomainAddBtn = ({
  setSubdomainInputs,
  subdomainInputs,
  idx,
  setDomainVisible,
  domainVisible,
  setCategoryAdded,
}: SubdomainAddBtnProps) => {
  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        setSubdomainInputs(subdomainInputs.map((_, elmKey) => idx === elmKey));
        setDomainVisible(
          domainVisible.map((elme, elmKey) => {
            if (idx === elmKey) {
              return true;
            }
            return elme;
          }),
        );
        setCategoryAdded(null);
      }}
    >
      <FontAwesomeIcon icon={faPlus} />
    </Button>
  );
};

export default SubdomainAddBtn;
