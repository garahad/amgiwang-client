/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { Button, Row, Col, Rate } from 'antd';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import {
  DELETE_QUESTION,
  GET_CATEGORIES,
  GET_QUESTIONS,
  EDIT_QUESTION,
} from '../../graphql/queries';

type BottomBtnsProps = {
  match: any;
  history: any;
  qList: any;
  rating: any;
  visible: any;
  setVisible: any;
  editing: any;
  setEditing: any;
  newQ: any;
  newAnswer: any;
  importanceObj: any;
};

const BottomBtns = ({
  match,
  history,
  qList,
  rating,
  visible,
  setVisible,
  editing,
  setEditing,
  newQ,
  newAnswer,
  importanceObj,
}: BottomBtnsProps) => {
  const [deleteQuestion] = useMutation(DELETE_QUESTION, {
    refetchQueries: [
      { query: GET_CATEGORIES, variables: { id: 1 } },
      { query: GET_QUESTIONS, variables: { id: 1 } },
    ],
    onCompleted: () => {
      alert('삭제되었습니다');
      setEditing(false);
      setVisible(false);
      if (match.params.domain) {
        history.push(
          `/solve/${match.params.domain}/${match.params.subdomain}/1`,
        );
      } else {
        history.push(`/solve/중요도${match.params.importance}/1`);
      }
    },
  });
  const [editQuestion] = useMutation(EDIT_QUESTION, {
    refetchQueries: [{ query: GET_QUESTIONS, variables: { id: 1 } }],
    onCompleted: () => {
      alert('저장되었습니다');
    },
  });

  let answerButton = '정답 가리기';
  if (!visible) {
    answerButton = '정답 확인';
  }

  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

  // console.log('지금문제', qList[Number(match.params.qNumber) - 1]);

  return (
    <Row gutter={{ xs: 12, md: 24 }}>
      <Col span={8}>
        <span>중요도</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>
          <Rate
            tooltips={desc}
            // onChange={setRating}
            value={rating}
          />
        </span>
      </Col>
      <Col span={16}>
        <Row>
          <Col span={8}>
            <Button
              onClick={() => setVisible(false)}
              disabled={Number(match.params.qNumber) <= 1 || editing}
            >
              <Link to={`${Number(match.params.qNumber) - 1}`}>이전</Link>
            </Button>
            &nbsp;
            <Button
              onClick={() => setVisible(false)}
              disabled={
                Number(match.params.qNumber) === qList.length || editing
              }
            >
              <Link to={`${Number(match.params.qNumber) + 1}`}>다음</Link>
            </Button>
            &nbsp;
          </Col>
          <Col span={8}>
            {editing ? null : (
              <Button onClick={() => setVisible(!visible)}>
                {answerButton}
              </Button>
            )}
          </Col>
          <Col span={8}>
            <Button
              onClick={() => {
                setEditing(!editing);
                if (editing) {
                  setVisible(false);
                  editQuestion({
                    variables: {
                      id: qList[Number(match.params.qNumber) - 1].id,
                      owner: qList[Number(match.params.qNumber) - 1].owner.id,
                      category:
                        qList[Number(match.params.qNumber) - 1].category.id,
                      importance:
                        importanceObj[rating] ||
                        qList[Number(match.params.qNumber) - 1].importance,
                      questionContent:
                        newQ ||
                        qList[Number(match.params.qNumber) - 1].questionContent,
                      answer:
                        newAnswer ||
                        qList[Number(match.params.qNumber) - 1].answer,
                    },
                  });
                } else {
                  setVisible(true);
                }
              }}
            >
              {editing ? '저장' : '수정'}
            </Button>
            {editing ? (
              <React.Fragment>
                &nbsp;
                <Button
                  onClick={() => {
                    setEditing(false);
                    setVisible(false);
                  }}
                >
                  취소
                </Button>
              </React.Fragment>
            ) : null}
            &nbsp;
            <Button
              onClick={() => {
                if (window.confirm('정말 삭제하시겠습니까?')) {
                  deleteQuestion({
                    variables: {
                      id: qList[Number(match.params.qNumber) - 1].id,
                    },
                  });
                } else {
                  alert('삭제가 취소되었습니다');
                }
              }}
            >
              삭제
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default BottomBtns;
