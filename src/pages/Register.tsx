/** @jsx jsx */
import { useState, useEffect, useRef } from 'react';
import { css, jsx } from '@emotion/core';
import {
  Layout,
  Breadcrumb,
  Button,
  Row,
  Col,
  Rate,
  Input,
  Tooltip,
} from 'antd';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  ADD_QUESTION,
  GET_CATEGORIES,
  GET_QUESTIONS,
} from '../graphql/queries';

const { TextArea } = Input;

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

type RegisterProps = {
  match: any;
  location: any;
};

// 이렇게 디자인 폼 똑같이 갖다 쓸때 중복 줄이는 법

function Register({ match }: RegisterProps) {
  const { data: dataCategories } = useQuery(GET_CATEGORIES, {
    variables: { id: 1 },
  });
  const [addQuestion] = useMutation(ADD_QUESTION, {
    refetchQueries: [{ query: GET_QUESTIONS, variables: { id: 1 } }],
  });
  const [newQ, setNewQ] = useState<string>('');
  const [newAnswer, setNewAnswer] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [toggleSubmit, setToggleSubmit] = useState<boolean>(true);
  const inputEl = useRef() as any;

  useEffect(() => {
    if (inputEl && inputEl.current) {
      inputEl.current!.focus();
    }
  }, [inputEl, match.params.subdomain, toggleSubmit]);

  const importanceObj = {
    1: 'ONE',
    2: 'TWO',
    3: 'THREE',
    4: 'FOUR',
    5: 'FIVE',
  };

  const task = '문제 등록';

  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

  let nowCategory;
  if (dataCategories && dataCategories.getCategories) {
    [nowCategory] = dataCategories.getCategories.reduce((acc, elm, key) => {
      if (
        elm.domain === match.params.domain &&
        elm.subdomain === match.params.subdomain
      ) {
        acc.push(key);
      }
      return acc;
    }, []);
  }

  return (
    <Layout css={wrapper}>
      <Breadcrumb css={breadcrumbCss}>
        <Breadcrumb.Item>{task}</Breadcrumb.Item>
        <Breadcrumb.Item>{match.params.domain}</Breadcrumb.Item>
        <Breadcrumb.Item>{match.params.subdomain}</Breadcrumb.Item>
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
              <TextArea
                autoSize={{ minRows: 4, maxRows: 20 }}
                placeholder="여기에 문제를 쓰세요"
                ref={inputEl}
                onChange={(e) => setNewQ(e.target.value)}
                value={newQ}
              />
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div css={answerTitle}>답</div>
            <div css={answerInput}>
              <TextArea
                autoSize={{ minRows: 4, maxRows: 20 }}
                placeholder="여기에 답을 쓰세요"
                onChange={(e) => setNewAnswer(e.target.value)}
                value={newAnswer}
              />
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
              <Rate tooltips={desc} onChange={setRating} value={rating} />
            </span>
          </Col>
          <Col className="gutter-row" span={12}>
            <Row>
              <Col span={16}>
                {/* <Button>취소</Button> &nbsp; */}
                <Tooltip
                  title="문제, 답, 중요도를 모두 기록해주세요"
                  visible={!rating || !newAnswer || !newQ}
                >
                  <Button
                    disabled={!rating}
                    onClick={() => {
                      // category 번호를 local state로 sidebar와 공유하거나 match.params에서 추정
                      addQuestion({
                        variables: {
                          owner: 1,
                          category: nowCategory + 1,
                          importance: importanceObj[rating],
                          questionContent: newQ,
                          answer: newAnswer,
                        },
                      });
                      setNewQ('');
                      setNewAnswer('');
                      setRating(0);
                      setToggleSubmit(!toggleSubmit);
                      alert('저장완료');
                    }}
                  >
                    저장
                  </Button>
                </Tooltip>
                &nbsp;
              </Col>
              {/* <Col span={8}>
                <Button onClick={() => setVisible(!visible)}>
                  {answerButton}
                </Button>
              </Col> */}
            </Row>
          </Col>
        </Row>
      </Layout.Footer>
    </Layout>
  );
}

export default Register;
