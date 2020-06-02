import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

type SubdomainListProps = {
  ele: string;
  elm: any;
  dataQuestions: any;
  location: any;
};

const SubdomainList = ({
  ele,
  elm,
  dataQuestions,
  location,
}: SubdomainListProps) => {
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
        <Link to={`/register/${Object.keys(elm)[0]}/${ele}`}>+</Link>
      </Button>
    </li>
  );
};

export default SubdomainList;
