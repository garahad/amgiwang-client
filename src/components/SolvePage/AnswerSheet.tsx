/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { answerTitle, answerInput, textareaCss } from '../../css/emotions';

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
