/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';

const questionTitle = css`
  background-color: #95bff2;
  padding: 8px 8px;
`;

const questionInput = css`
  background-color: #f2eee6;
  padding: 8px 8px;
  height: 50vh;
`;

type QSheetProps = {
  qList: any;
  match: any;
};

const QSheet = ({ qList, match }: QSheetProps) => {
  return (
    <React.Fragment>
      <div css={questionTitle}>문제</div>
      <div css={questionInput}>
        {
          qList.filter(
            (_, key) => Number(key + 1) === Number(match.params.qNumber),
          )[0]!.questionContent
        }
      </div>
    </React.Fragment>
  );
};

export default QSheet;
