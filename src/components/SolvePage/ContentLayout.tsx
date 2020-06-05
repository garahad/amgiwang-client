/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { Layout, Row, Col } from 'antd';
import IndexBtns from './IndexBtns';
import QSheet from './QSheet';
import AnswerSheet from './AnswerSheet';

const indexBtnBoxCss = css`
  width: 40px;
  overflow: auto;
  text-align: center;
`;
type ContentLayoutProps = {
  qList: any;
  match: any;
  history: any;
  editing: any;
  setNewQ: any;
  setNewAnswer: any;
  answerVisible: any;
};

const ContentLayout = ({
  qList,
  match,
  history,
  editing,
  setNewQ,
  setNewAnswer,
  answerVisible,
}: ContentLayoutProps) => {
  return (
    <React.Fragment>
      <Layout.Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 500,
        }}
      >
        <Row gutter={{ xs: 12, md: 24 }}>
          <Col span={4} css={indexBtnBoxCss}>
            <IndexBtns {...{ qList, match, history, editing }} />
          </Col>
          <Col span={10}>
            <QSheet
              {...{
                qList,
                match,
                editing,
                setNewQ,
              }}
            />
          </Col>
          <Col span={10}>
            <AnswerSheet
              {...{
                answerVisible,
                qList,
                match,
                editing,
                setNewAnswer,
              }}
            />
          </Col>
        </Row>
      </Layout.Content>
    </React.Fragment>
  );
};

export default ContentLayout;
