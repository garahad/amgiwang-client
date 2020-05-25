import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

type SubdomainListProps = {
  ele: string;
  elm: any;
  dataQuestions: any;
};

const SubdomainList = ({ ele, elm, dataQuestions }: SubdomainListProps) => {
  return (
    <li key={ele} style={{ marginLeft: '30px' }}>
      <Link to={`/solve/${Object.keys(elm)[0]}/${ele}/1`}>
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
