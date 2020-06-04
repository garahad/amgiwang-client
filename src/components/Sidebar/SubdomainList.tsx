import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import CategoryEditBtn from './CategoryEdit/CategoryEditBtn';
import CategoryEditCancelBtn from './CategoryEdit/CategoryEditCancelBtn';
import useMutateCategory from '../../hooks/useMutateCategory';

type SubdomainListProps = {
  ele: string;
  elm: any;
  dataQuestions: any;
  dataCategories: any;
  location: any;
  history: any;
  newSubdomain: any;
  setNewSubdomain: any;
};

const SubdomainList = ({
  ele,
  elm,
  dataQuestions,
  dataCategories,
  location,
  history,
  newSubdomain,
  setNewSubdomain,
}: SubdomainListProps) => {
  const {
    editing,
    setEditing,
    inputEl,
    deleteCategory,
    editCategory,
  } = useMutateCategory({ history });

  const [btnsVisible, setBtnsVisible] = useState<boolean>(false);

  const [selectedSubdomain] = dataCategories.getCategories.filter(
    (oneSubd) => oneSubd.subdomain === ele,
  );

  return (
    <li
      key={ele}
      style={{
        marginLeft: '30px',
      }}
      onMouseEnter={() => setBtnsVisible(true)}
      onMouseLeave={() => setBtnsVisible(false)}
    >
      <Link
        to={`/solve/${Object.keys(elm)[0]}/${ele}/1`}
        style={{
          color: location.pathname.split('/')[3] === ele ? 'red' : 'black',
        }}
      >
        {editing ? (
          <input
            type="text"
            ref={inputEl}
            defaultValue={ele}
            onChange={(e) => setNewSubdomain(e.target.value)}
          />
        ) : (
          <>
            {ele}
            {`(${
              dataQuestions.getQuestions.filter(
                ({ category }) =>
                  category.domain === Object.keys(elm)[0] &&
                  category.subdomain === ele,
              ).length
            }
            )`}
          </>
        )}
      </Link>
      {btnsVisible ? (
        <>
          <Button>
            <Link to={`/register/${Object.keys(elm)[0]}/${ele}`}>
              <FontAwesomeIcon icon={faPlus} />
            </Link>
          </Button>
          <Button
            onClick={() => {
              if (
                window.confirm(
                  '해당 카테고리를 삭제하시겠습니까? 해당 카테고리의 문제들이 모두 삭제됩니다',
                )
              ) {
                deleteCategory({
                  variables: {
                    id: dataCategories.getCategories.filter(
                      (oneCate) =>
                        oneCate.domain === Object.keys(elm)[0] &&
                        oneCate.subdomain === ele,
                    )[0].id,
                  },
                });
              }
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
        </>
      ) : null}
      {btnsVisible && !editing ? <CategoryEditBtn {...{ setEditing }} /> : null}

      {editing ? (
        <>
          <Button
            onClick={() => {
              setEditing(false);
              editCategory({
                variables: {
                  id: selectedSubdomain.id,
                  domain: selectedSubdomain.domain,
                  subdomain: newSubdomain,
                },
              });
            }}
          >
            저장
          </Button>
          <CategoryEditCancelBtn {...{ setEditing }} />
        </>
      ) : null}
    </li>
  );
};

export default SubdomainList;
