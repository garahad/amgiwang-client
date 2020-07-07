/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { sidebarEditBtnCss } from '../../../css/emotions';

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
      size="small"
      css={sidebarEditBtnCss}
    >
      <FontAwesomeIcon icon={faPlus} size="sm" />
    </Button>
  );
};

export default SubdomainAddBtn;
