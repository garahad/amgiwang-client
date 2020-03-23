import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Breadcrumb, Button, Row, Col, Rate } from 'antd';

type QuestionProps = {
  match: any;
  location: any;
};

function Question({ match, location }: QuestionProps) {
  const [rating, setRating] = useState<number>(3);

  let task;
  if (location.pathname.split('/')[1] === 'solve') {
    task = '문제 풀기';
  } else {
    task = '문제 등록';
  }

  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

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
              book
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div style={{ padding: '8px 0' }}>답</div>
            <div style={{ border: '1px solid gray', padding: '8px 0' }}>책</div>
          </Col>
        </Row>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>
        <span>중요도</span>
        <span>
          <Rate tooltips={desc} onChange={setRating} value={rating} />
        </span>
        <Button>
          <Link to={`${Number(match.params.qNumber) - 1}`}>이전</Link>
        </Button>
        <Button>
          <Link to={`${Number(match.params.qNumber) + 1}`}>다음</Link>
        </Button>
        <Button>정답 확인</Button>
      </Layout.Footer>
    </Layout>
  );
}

export default Question;
