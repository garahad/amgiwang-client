/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Button, Row, Col, Rate } from 'antd';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import {
  DELETE_QUESTION,
  GET_CATEGORIES,
  GET_QUESTIONS,
} from '../../graphql/queries';

type BottomBtnsProps = {
  match: any;
  history: any;
  qList: any;
  rating: any;
  visible: any;
  setVisible: any;
};

const BottomBtns = ({
  match,
  history,
  qList,
  rating,
  visible,
  setVisible,
}: BottomBtnsProps) => {
  const [deleteQuestion] = useMutation(DELETE_QUESTION, {
    refetchQueries: [
      { query: GET_CATEGORIES, variables: { id: 1 } },
      { query: GET_QUESTIONS, variables: { id: 1 } },
    ],
    onCompleted: () => {
      alert('삭제되었습니다');
      if (match.params.domain) {
        history.push(
          `/solve/${match.params.domain}/${match.params.subdomain}/1`,
        );
      } else {
        history.push(`/solve/중요도${match.params.importance}/1`);
      }
    },
  });

  let answerButton = '정답 가리기';
  if (!visible) {
    answerButton = '정답 확인';
  }

  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

  return (
    <Row gutter={{ xs: 12, md: 24 }}>
      <Col className="gutter-row" span={12}>
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
      <Col className="gutter-row" span={12}>
        <Row>
          <Col span={12}>
            <Button
              onClick={() => setVisible(false)}
              disabled={Number(match.params.qNumber) <= 1}
            >
              <Link to={`${Number(match.params.qNumber) - 1}`}>이전</Link>
            </Button>
            &nbsp;
            <Button
              onClick={() => setVisible(false)}
              disabled={Number(match.params.qNumber) === qList.length}
            >
              <Link to={`${Number(match.params.qNumber) + 1}`}>다음</Link>
            </Button>
            &nbsp;
          </Col>
          <Col span={12}>
            <Button onClick={() => setVisible(!visible)}>{answerButton}</Button>
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
