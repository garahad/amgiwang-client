/** @jsx jsx */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { css, jsx } from '@emotion/core';
import { Layout, Breadcrumb, Button, Row, Col, Rate } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { questions } from '../fakeData';
import { GET_QUESTIONS } from '../graphql/queries';

const wrapper = css`
  padding: 0 24px 24px;
`;

const breadcrumbCss = css`
  margin: 16px 0;
`;

// const contentLayout = css`
//   padding: 24px,
//   margin: 0,
//   min-height: 280,
//   background: #fff;
// `;

const questionTitle = css`
  background-color: #95bff2;
  padding: 8px 8px;
`;

const questionInput = css`
  background-color: #f2eee6;
  padding: 8px 8px;
  height: 50vh;
`;

const answerTitle = css`
  background-color: #f2a690;
  padding: 8px 8px;
`;

const answerInput = css`
  background-color: #f2decf;
  padding: 8px 8px;
  height: 50vh;
`;

const footerCss = css`
  text-align: center;
  background-color: #6c6564;
`;

type QuestionProps = {
  match: any;
  location: any;
};

function Question({ match, location }: QuestionProps) {
  // const [rating, setRating] = useState<number>(3);
  const [visible, setVisible] = useState<boolean>(false);

  const { data, error } = useQuery(GET_QUESTIONS, {
    variables: { id: 1 },
  });

  if (error) console.log('questoins', questions);
  if (data) console.log('data', data);

  const importanceObj = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
  };

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

  let qList;
  if (data) {
    qList = data.getQuestions.filter(
      (elm) =>
        elm.category.domain === match.params.domain &&
        elm.category.subdomain === match.params.subdomain,
    );
  } else {
    qList = questions.filter(
      (elm) =>
        elm.domain === match.params.domain &&
        elm.subdomain === match.params.subdomain,
    );
  }

  if (qList.length === 0) return null;

  return (
    <Layout css={wrapper}>
      <Breadcrumb css={breadcrumbCss}>
        <Breadcrumb.Item>{task}</Breadcrumb.Item>
        <Breadcrumb.Item>{match.params.domain}</Breadcrumb.Item>
        <Breadcrumb.Item>{match.params.subdomain}</Breadcrumb.Item>
        <Breadcrumb.Item>{match.params.qNumber}번 문제</Breadcrumb.Item>
      </Breadcrumb>
      <Layout.Content
        className="site-layout-background"
        // css={contentLayout} 안 되네...
        style={{
          padding: 24,
          margin: 0,
          minHeight: 500,
        }}
      >
        <Row gutter={{ xs: 12, md: 24 }}>
          <Col className="gutter-row" span={12}>
            <div css={questionTitle}>문제</div>
            <div css={questionInput}>
              {
                qList.filter(
                  (_, key) => Number(key) === Number(match.params.qNumber),
                )[0].questionContent
              }
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div css={answerTitle}>답</div>
            <div css={answerInput}>
              <span
                style={{
                  display: answerVisible,
                }}
              >
                {
                  qList.filter(
                    (_, key) => Number(key) === Number(match.params.qNumber),
                  )[0].answer
                }
              </span>
            </div>
          </Col>
        </Row>
      </Layout.Content>
      <Layout.Footer css={footerCss}>
        <Row gutter={{ xs: 12, md: 24 }}>
          <Col className="gutter-row" span={12}>
            <span>중요도</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>
              <Rate
                tooltips={desc}
                // onChange={setRating}
                value={
                  importanceObj[
                    qList.filter(
                      (_, key) => Number(key) === Number(match.params.qNumber),
                    )[0].importance
                  ]
                }
              />
            </span>
          </Col>
          <Col className="gutter-row" span={12}>
            <Row>
              <Col span={16}>
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
              <Col span={8}>
                <Button onClick={() => setVisible(!visible)}>
                  {answerButton}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Layout.Footer>
    </Layout>
  );
}

export default Question;
