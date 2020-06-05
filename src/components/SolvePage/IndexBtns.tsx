/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Button } from 'antd';

const indexBtnWrapperCss = css`
  height: 50vh;
`;
const indexBtnCss = css`
  width: 60%;
  &:hover {
    outline: none;
    border: 0.5px solid #95bff2;
  }
  &:focus {
    outline: none;
    border: 0.5px solid #95bff2;
  }
  text-align: center;
  padding: 0px;
`;

type IndexBtnsProps = {
  qList: any;
  match: any;
  history: any;
  editing: boolean;
};

const IndexBtns = ({ qList, match, history, editing }: IndexBtnsProps) => {
  return (
    <div css={indexBtnWrapperCss}>
      {qList.map((_, key) => {
        return (
          <Button
            key={key}
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
            style={{
              backgroundColor:
                Number(match.params.qNumber) === key + 1 ? '#95BFF2' : 'white',
              color:
                Number(match.params.qNumber) === key + 1 ? 'white' : 'black',
            }}
            css={indexBtnCss}
          >
            {key + 1}
          </Button>
        );
      })}
    </div>
  );
};

export default IndexBtns;
