import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const ImportanceCates = () => {
  return (
    <ul>
      중요도
      <li>
        <Button>
          <Link to="/solve/중요도5/1">별5개</Link>
        </Button>
      </li>
      <li>
        <Button>
          <Link to="/solve/중요도4/1">별4개</Link>
        </Button>
      </li>
      <li>
        <Button>
          <Link to="/solve/중요도3/1">별3개</Link>
        </Button>
      </li>
      <li>
        <Button>
          <Link to="/solve/중요도2/1">별2개</Link>
        </Button>
      </li>
      <li>
        <Button>
          <Link to="/solve/중요도1/1">별1개</Link>
        </Button>
      </li>
    </ul>
  );
};

export default ImportanceCates;
