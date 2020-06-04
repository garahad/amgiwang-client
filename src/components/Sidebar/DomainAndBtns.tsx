import React from 'react';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import SubdomainAddBtn from './SubdomainAdd/SubdomainAddBtn';
import CategoryEditBtn from './CategoryEdit/CategoryEditBtn';
import CategoryEditCancelBtn from './CategoryEdit/CategoryEditCancelBtn';
import useMutateCategory from '../../hooks/useMutateCategory';

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

  const relevantSubCategories = dataCategories.getCategories.filter(
    (oneCate) => oneCate.domain === Object.keys(elm)[0],
  );

  return (
    <>
      <Button
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
      >
        <UserOutlined />
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
      </Button>
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
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </Button>
      {editing ? (
        <>
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
          >
            저장
          </Button>
          <CategoryEditCancelBtn {...{ setEditing }} />
        </>
      ) : (
        <CategoryEditBtn {...{ setEditing }} />
      )}
    </>
  );
};

export default DomainAndBtns;
