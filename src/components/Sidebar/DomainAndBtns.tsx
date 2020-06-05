/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useState } from 'react';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import SubdomainAddBtn from './SubdomainAdd/SubdomainAddBtn';
import CategoryEditBtn from './CategoryEdit/CategoryEditBtn';
import CategoryEditCancelBtn from './CategoryEdit/CategoryEditCancelBtn';
import useMutateCategory from '../../hooks/useMutateCategory';

const oneDomainCss = css`
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 20px;
`;

type DomainAndBtnsProps = {
  setDomainVisible: Function;
  domainVisible: boolean[];
  idx: number;
  setSubdomainInputs: Function;
  subdomainInputs: boolean[];
  elm: any;
  newDomain: string;
  setNewDomain: Function;
  domains: any[];
  newProps: any;
  history: any;
  dataCategories: any;
};

const DomainAndBtns = ({
  setDomainVisible,
  domainVisible,
  idx,
  setSubdomainInputs,
  subdomainInputs,
  elm,
  newDomain,
  setNewDomain,
  newProps,
  history,
  dataCategories,
}: DomainAndBtnsProps) => {
  const {
    editing,
    setEditing,
    inputEl,
    deleteCategory,
    editCategory,
  } = useMutateCategory({ history });
  const [btnsVisible, setBtnsVisible] = useState<boolean>(false);

  const relevantSubCategories = dataCategories.getCategories.filter(
    (oneCate) => oneCate.domain === Object.keys(elm)[0],
  );

  return (
    <li
      css={oneDomainCss}
      onClick={() => {
        if (!editing) {
          setDomainVisible(
            domainVisible.map((elme, elmKey) => {
              if (idx === elmKey) {
                return !elme;
              }
              return elme;
            }),
          );
          setSubdomainInputs(
            subdomainInputs.map((el, elKey) => {
              if (idx === elKey && el) {
                return false;
              }
              return el;
            }),
          );
        }
        if (relevantSubCategories.length === 1) {
          alert('아직 하위 카테고리가 없습니다');
        }
      }}
      onMouseEnter={() => setBtnsVisible(true)}
      onMouseLeave={() => setBtnsVisible(false)}
    >
      {editing ? (
        <input
          type="text"
          defaultValue={Object.keys(elm)[0]}
          onChange={(e) => setNewDomain(e.target.value)}
          ref={inputEl}
        />
      ) : (
        Object.keys(elm)[0]
      )}
      &nbsp;&nbsp;
      {btnsVisible ? (
        <React.Fragment>
          <SubdomainAddBtn {...newProps} />
          <Button
            onClick={() => {
              if (
                window.confirm(
                  '카테고리를 삭제하겠습니까? 하위 코테고리 및 문제들이 같이 삭제됩니다',
                )
              ) {
                deleteCategory({
                  variables: { domain: Object.keys(elm)[0] },
                });
              }
            }}
            size="small"
          >
            <FontAwesomeIcon icon={faTrashAlt} size="sm" />
          </Button>
        </React.Fragment>
      ) : null}
      {btnsVisible && !editing ? <CategoryEditBtn {...{ setEditing }} /> : null}
      {editing ? (
        <React.Fragment>
          <Button
            onClick={() => {
              setEditing(false);
              relevantSubCategories.forEach((oneSubCate) => {
                editCategory({
                  variables: {
                    id: oneSubCate.id,
                    domain: newDomain,
                    subdomain: oneSubCate.subdomain,
                  },
                });
              });
            }}
            size="small"
          >
            저장
          </Button>
          <CategoryEditCancelBtn {...{ setEditing }} />
        </React.Fragment>
      ) : null}
    </li>
  );
};

export default DomainAndBtns;
