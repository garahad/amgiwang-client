/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useEffect, useRef } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { questionInput, questionTitle, textareaCss } from '../../css/emotions';

type QSheetProps = {
  qList: any;
  match: any;
  editing: any;
  setNewQ: any;
};

const QSheet = ({ qList, match, editing, setNewQ }: QSheetProps) => {
  const inputEl = useRef() as any;

  let content = qList.filter(
    (_, key) => Number(key + 1) === Number(match.params.qNumber),
  )[0]!.questionContent;
  const contentLength = content.length;
  if (editing) {
    content = (
      <TextareaAutosize
        css={textareaCss}
        rowsMin={4}
        ref={inputEl}
        onChange={(e) => {
          setNewQ(e.target.value);
        }}
        defaultValue={content}
      />
    );
  }

  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus();
      inputEl.current.setSelectionRange(contentLength + 1, contentLength + 1);
    }
  }, [inputEl, editing, contentLength]);

  return (
    <React.Fragment>
      <div css={questionTitle}>문제</div>
      <div css={questionInput}>{content}</div>
    </React.Fragment>
  );
};

export default QSheet;
