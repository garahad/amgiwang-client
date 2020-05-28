/** @jsx jsx */
import { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/core';
import { Layout, Breadcrumb, Row, Col } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { GET_QUESTIONS } from '../graphql/queries';
import IndexBtns from '../components/SolvePage/IndexBtns';
import QSheet from '../components/SolvePage/QSheet';
import AnswerSheet from '../components/SolvePage/AnswerSheet';
import BottomBtns from '../components/SolvePage/BottomBtns';

const wrapper = css`
  padding: 0 24px 24px;
`;
const breadcrumbCss = css`
  margin: 16px 0;
`;
const footerCss = css`
  text-align: center;
  background-color: #6c6564;
`;

type SolveImportanceProps = {
  match: any;
  history: any;
};

function SolveImportance({ match, history }: SolveImportanceProps) {
  const [rating, setRating] = useState<number>(3);
  const [visible, setVisible] = useState<boolean>(false);
  const { data: dataQuestions, error } = useQuery(GET_QUESTIONS, {
    variables: { id: 1 },
  });

  const importanceObj = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
  };

  if (error) console.log(error);

  const task = '문제 풀기';

  // solveCategory와 solveImportance의 중복인 부분 깔끔하게 제거하는 방법 있을까?

  let answerVisible;
  if (!visible) {
    answerVisible = 'none';
  } else {
    answerVisible = '';
  }

  let qList;
  if (dataQuestions && dataQuestions.getQuestions.length > 0) {
    qList = dataQuestions.getQuestions.filter(
      (elm) =>
        importanceObj[elm.importance] === Number(match.params.importance),
    );
  } else {
    qList = [];
  }

  useEffect(() => {
    setRating(Number(match.params.importance));
  }, [match.params.importance]);

  if (qList.length === 0) return null;

  return (
    <Layout css={wrapper}>
      <Breadcrumb css={breadcrumbCss}>
        <Breadcrumb.Item>{task}</Breadcrumb.Item>
        <Breadcrumb.Item>중요도 {match.params.importance}</Breadcrumb.Item>
        {/* <Breadcrumb.Item>{match.params.importance}</Breadcrumb.Item> */}
        <Breadcrumb.Item>
          {match.params.qNumber}번 문제{' '}
          {`(${qList[match.params.qNumber].category.domain} / ${
            qList[match.params.qNumber].category.subdomain
          })`}
        </Breadcrumb.Item>
      </Breadcrumb>
      <Layout.Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 500,
        }}
      >
        <Row gutter={{ xs: 12, md: 24 }}>
          <Col className="gutter-row" span={4}>
            <IndexBtns {...{ qList, match, history }} />
          </Col>
          <Col className="gutter-row" span={10}>
            <QSheet {...{ qList, match }} />
          </Col>
          <Col className="gutter-row" span={10}>
            <AnswerSheet {...{ answerVisible, qList, match }} />
          </Col>
        </Row>
      </Layout.Content>
      <Layout.Footer css={footerCss}>
        <BottomBtns
          {...{ match, history, qList, rating, visible, setVisible }}
        />
      </Layout.Footer>
    </Layout>
  );
}

export default SolveImportance;
