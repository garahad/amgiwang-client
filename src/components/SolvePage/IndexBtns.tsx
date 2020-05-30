import React from 'react';
import { Button } from 'antd';

type IndexBtnsProps = {
  qList: any;
  match: any;
  history: any;
  editing: boolean;
};

const IndexBtns = ({ qList, match, history, editing }: IndexBtnsProps) => {
  return (
    <div style={{ height: '60vh', overflow: 'scroll' }}>
      {qList.map((_, key) => {
        return (
          <div key={key}>
            <Button
              disabled={editing}
              onClick={() => {
                if (match.params.domain) {
                  history.push(
                    `/solve/${match.params.domain}/${
                      match.params.subdomain
                    }/${key + 1}`,
                  );
                } else {
                  history.push(
                    `/solve/중요도${match.params.importance}/${key + 1}`,
                  );
                }
              }}
              type={
                Number(match.params.qNumber) === key + 1 ? 'primary' : 'default'
              }
            >
              {key + 1}
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default IndexBtns;
