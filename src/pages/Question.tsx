import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Breadcrumb, Button, Row, Col, Rate } from 'antd';
import questions from '../fakeData';

type QuestionProps = {
  match: any;
  location: any;
};

function Question({ match, location }: QuestionProps) {
  // const [rating, setRating] = useState<number>(3);
  const [visible, setVisible] = useState<boolean>(false);

  let task;
  if (location.pathname.split('/')[1] === 'solve') {
    task = '문제 풀기';
  } else {
    task = '문제 등록';
  }

  let answerVisible;
  let answerButton;
  if (!visible) {
    answerVisible = 'none';
    answerButton = '정답 확인';
  } else {
    answerVisible = '';
    answerButton = '정답 가리기';
  }

  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

  const qList = questions.filter((elm) => {
    return (
      elm.domain === match.params.domain &&
      elm.subdomain === match.params.subdomain
    );
  });

  return (
    <Layout style={{ padding: '0 24px 24px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>{task}</Breadcrumb.Item>
        <Breadcrumb.Item>{match.params.domain}</Breadcrumb.Item>
        <Breadcrumb.Item>{match.params.subdomain}</Breadcrumb.Item>
      </Breadcrumb>
      <Layout.Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <Row gutter={{ xs: 12, md: 24 }}>
          <Col className="gutter-row" span={12}>
            <div style={{ padding: '8px 0' }}>문제</div>
            <div style={{ border: '1px solid gray', padding: '8px 0' }}>
              {
                qList.filter(
                  (elm) => elm.number === Number(match.params.qNumber),
                )[0].question
              }
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div style={{ padding: '8px 0' }}>답</div>
            <div
              style={{
                border: '1px solid gray',
                padding: '8px 0',
                display: answerVisible,
              }}
            >
              {
                qList.filter(
                  (elm) => elm.number === Number(match.params.qNumber),
                )[0].answer
              }
            </div>
          </Col>
        </Row>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>
        <span>중요도</span>
        <span>
          <Rate
            tooltips={desc}
            // onChange={setRating}
            value={
              qList.filter(
                (elm) => elm.number === Number(match.params.qNumber),
              )[0].importance
            }
          />
        </span>
        <Button
          onClick={() => setVisible(false)}
          disabled={Number(match.params.qNumber) <= 1}
        >
          <Link to={`${Number(match.params.qNumber) - 1}`}>이전</Link>
        </Button>
        <Button onClick={() => setVisible(false)}>
          <Link to={`${Number(match.params.qNumber) + 1}`}>다음</Link>
        </Button>
        <Button onClick={() => setVisible(!visible)}>{answerButton}</Button>
      </Layout.Footer>
    </Layout>
  );
}

export default Question;
