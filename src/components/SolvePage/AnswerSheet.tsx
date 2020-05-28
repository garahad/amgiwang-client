/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';

const answerTitle = css`
  background-color: #f2a690;
  padding: 8px 8px;
`;

const answerInput = css`
  background-color: #f2decf;
  padding: 8px 8px;
  height: 50vh;
`;

type AnswerSheetProps = {
  answerVisible: any;
  qList: any;
  match: any;
};

const AnswerSheet = ({ answerVisible, qList, match }: AnswerSheetProps) => {
  return (
    <React.Fragment>
      <div css={answerTitle}>답</div>
      <div css={answerInput}>
        <span
          style={{
            display: answerVisible,
          }}
        >
          {
            qList.filter(
              (_, key) => Number(key + 1) === Number(match.params.qNumber),
            )[0].answer
          }
        </span>
      </div>
    </React.Fragment>
  );
};

export default AnswerSheet;
