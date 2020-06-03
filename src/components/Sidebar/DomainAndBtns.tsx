import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/react-hooks';
import SubdomainAddBtn from './SubdomainAddBtn';
import {
  DELETE_CATEGORY,
  GET_CATEGORIES,
  EDIT_CATEGORY,
} from '../../graphql/queries';

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
  const [editing, setEditing] = useState<boolean>(false);

  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES, variables: { id: 1 } }],
    onCompleted: () => {
      alert('삭제되었습니다');
      history.push('/');
    },
  });
  const [editCategory] = useMutation(EDIT_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES, variables: { id: 1 } }],
  });

  const inputEl = useRef() as any;

  useEffect(() => {
    if (inputEl && inputEl.current) inputEl.current.focus();
  }, [inputEl, editing]);

  const selectedCategories = dataCategories.getCategories.filter(
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
              selectedCategories.forEach((oneSubCate) => {
                editCategory({
                  variables: {
                    id: oneSubCate.id,
                    domain: newDomain,
                    subdomain: oneSubCate.subdomain,
                  },
                });
              });
              // editCategory({variables: ); 이거는 애매한 면이 있는게 카테고리 서브카테고리 다 있어야 해서. 각각 id 다 적고, domain, subdomain 다 적는 식이 돼야 할듯.
            }}
          >
            저장
          </Button>
          <Button
            onClick={() => {
              setEditing(false);
              setNewDomain(Object.keys(elm)[0]);
            }}
          >
            취소
          </Button>
        </>
      ) : (
        <Button
          onClick={() => {
            setEditing(true);
          }}
        >
          <FontAwesomeIcon icon={faPen} />
        </Button>
      )}
    </>
  );
};

export default DomainAndBtns;
