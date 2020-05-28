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
// const contentLayout = css`
//   padding: 24px,
//   margin: 0,
//   min-height: 280,
//   background: #fff;
// `;
const footerCss = css`
  text-align: center;
  background-color: #6c6564;
`;

type SolveCategoryProps = {
  match: any;
  history: any;
};

function SolveCategory({ match, history }: SolveCategoryProps) {
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

  // let task;
  // if (location.pathname.split('/')[1] === 'solve') {
  //   task = '문제 풀기';
  // } else {
  //   task = '문제 등록';
  // }문제 풀기
  const task = '문제 풀기';
  // 여기 나중에 수정

  let answerVisible;
  if (!visible) {
    answerVisible = 'none';
  } else {
    answerVisible = '';
  }

  let qList;
  let importanceNumber;
  if (dataQuestions && dataQuestions.getQuestions.length > 0) {
    qList = dataQuestions.getQuestions.filter(
      (elm) =>
        elm.category.domain === match.params.domain &&
        elm.category.subdomain === match.params.subdomain,
    );

    if (qList.length > 0) {
      importanceNumber =
        importanceObj[qList[Number(match.params.qNumber) - 1].importance];
    } else {
      importanceNumber = 0;
    }
  } else {
    qList = [];
  }

  useEffect(() => {
    setRating(importanceNumber);
  }, [importanceNumber]);

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

export default SolveCategory;
