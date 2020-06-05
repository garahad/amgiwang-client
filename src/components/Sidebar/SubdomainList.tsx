/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import CategoryEditBtn from './CategoryEdit/CategoryEditBtn';
import CategoryEditCancelBtn from './CategoryEdit/CategoryEditCancelBtn';
import useMutateCategory from '../../hooks/useMutateCategory';

const liCss = css`
  margin-left: 30px;
  font-size: 16px;
  padding-top: 5px;
  padding-bottom: 5px;
  list-style-type: circle;
`;
const btnCss = css`
  border-radius: 5px;
  border: none;
  color: #999999;
  background-color: #f2eee6;
  margin-right: 1px;
  &:hover {
    color: #999999;
    background-color: #f18f6d;
  }
`;
const inputBtnCss = css`
  border-radius: 5px;
  border: none;
  color: black;
  background-color: #f2eee6;
  margin-right: 1px;
  &:hover {
    color: black;
    background-color: #f18f6d;
  }
`;
const inputCss = css`
  width: 50%;
  &:focus {
    outline: 0.5px solid #999;
    border: none;
  }
`;

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
  const [hovered, setHovered] = useState<boolean>(false);

  const [selectedSubdomain] = dataCategories.getCategories.filter(
    (oneSubd) => oneSubd.subdomain === ele,
  );

  return (
    <li
      key={ele}
      css={liCss}
      onMouseEnter={() => setBtnsVisible(true)}
      onMouseLeave={() => setBtnsVisible(false)}
    >
      <Link
        to={`/solve/${Object.keys(elm)[0]}/${ele}/1`}
        style={{
          color:
            location.pathname.split('/')[3] === ele
              ? '#F17B67'
              : hovered
              ? '#F18F6D'
              : '#55595C',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        // css={css`
        //   &:hover {
        //     color: red;
        //   }
        // `}
      >
        {editing ? (
          <input
            type="text"
            ref={inputEl}
            defaultValue={ele}
            onChange={(e) => setNewSubdomain(e.target.value)}
            css={inputCss}
          />
        ) : (
          <React.Fragment>
            {ele}
            {`(${
              dataQuestions.getQuestions.filter(
                ({ category }) =>
                  category.domain === Object.keys(elm)[0] &&
                  category.subdomain === ele,
              ).length
            }
            )`}
          </React.Fragment>
        )}
      </Link>
      &nbsp;
      {btnsVisible ? (
        <React.Fragment>
          <Button size="small" css={btnCss}>
            <Link to={`/register/${Object.keys(elm)[0]}/${ele}`}>
              <FontAwesomeIcon icon={faPlus} size="sm" />
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
            size="small"
            css={btnCss}
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
              editCategory({
                variables: {
                  id: selectedSubdomain.id,
                  domain: selectedSubdomain.domain,
                  subdomain: newSubdomain,
                },
              });
            }}
            size="small"
            css={inputBtnCss}
          >
            저장
          </Button>
          <CategoryEditCancelBtn {...{ setEditing }} />
        </React.Fragment>
      ) : null}
    </li>
  );
};

export default SubdomainList;
