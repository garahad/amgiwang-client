import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/react-hooks';
import {
  DELETE_CATEGORY,
  GET_CATEGORIES,
  EDIT_CATEGORY,
} from '../../graphql/queries';

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
  const [editing, setEditing] = useState<boolean>(false);
  const inputEl = useRef() as any;
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

  const [selectedSubdomain] = dataCategories.getCategories.filter(
    (oneSubd) => oneSubd.subdomain === ele,
  );

  useEffect(() => {
    if (inputEl && inputEl.current) inputEl.current.focus();
  }, [inputEl, editing]);

  return (
    <li
      key={ele}
      style={{
        marginLeft: '30px',
      }}
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
          <span>
            {ele}
            {`(${
              dataQuestions.getQuestions.filter(
                ({ category }) =>
                  category.domain === Object.keys(elm)[0] &&
                  category.subdomain === ele,
              ).length
            }
            )`}
          </span>
        )}
      </Link>
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
      {editing ? (
        <>
          <Button
            onClick={() => {
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
          <Button
            onClick={() => {
              setEditing(false);
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
    </li>
  );
};

export default SubdomainList;
