/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const answerTitle = css`
  background-color: #f2a690;
  padding: 8px 8px;
`;
const answerInput = css`
  background-color: #f2decf;
  padding: 8px 8px;
  height: 50vh;
`;
const textareaCss = css`
  width: 100%;
`;

type AnswerSheetProps = {
  answerVisible: any;
  qList: any;
  match: any;
  editing: any;
  setNewAnswer: any;
};

const AnswerSheet = ({
  answerVisible,
  qList,
  match,
  editing,
  setNewAnswer,
}: AnswerSheetProps) => {
  let content = qList.filter(
    (_, key) => Number(key + 1) === Number(match.params.qNumber),
  )[0].answer;
  if (editing) {
    content = (
      <TextareaAutosize
        css={textareaCss}
        rowsMin={4}
        onChange={(e) => setNewAnswer(e.target.value)}
        defaultValue={content}
      />
    );
  }

  return (
    <React.Fragment>
      <div css={answerTitle}>답</div>
      <div css={answerInput}>
        <span
          style={{
            display: answerVisible,
          }}
        >
          {content}
        </span>
      </div>
    </React.Fragment>
  );
};

export default AnswerSheet;
