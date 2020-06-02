import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_CATEGORY, GET_CATEGORIES } from '../../graphql/queries';

type SubdomainListProps = {
  ele: string;
  elm: any;
  dataQuestions: any;
  dataCategories: any;
  location: any;
};

const SubdomainList = ({
  ele,
  elm,
  dataQuestions,
  dataCategories,
  location,
}: SubdomainListProps) => {
  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES, variables: { id: 1 } }],
    onCompleted: () => {
      alert('삭제되었습니다');
    },
  });

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
        {ele}
        {`(                              ${
          dataQuestions.getQuestions.filter(
            ({ category }) =>
              category.domain === Object.keys(elm)[0] &&
              category.subdomain === ele,
          ).length
        }
                            )`}
      </Link>
      <Button>
        <Link to={`/register/${Object.keys(elm)[0]}/${ele}`}>
          <FontAwesomeIcon icon={faPlus} />
        </Link>
      </Button>
      <Button
        onClick={() => {
          if (window.confirm('해당 카테고리를 삭제하시겠습니까?')) {
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
      <Button onClick={() => {}}>
        <FontAwesomeIcon icon={faPen} />
      </Button>
    </li>
  );
};

export default SubdomainList;
