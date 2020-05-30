/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { Layout, Row, Col } from 'antd';
import IndexBtns from './IndexBtns';
import QSheet from './QSheet';
import AnswerSheet from './AnswerSheet';
import BottomBtns from './BottomBtns';

const footerCss = css`
  text-align: center;
  background-color: #6c6564;
`;

type ContentLayoutProps = {
  qList: any;
  match: any;
  history: any;
  editing: any;
  setEditing: any;
  newQ: any;
  setNewQ: any;
  newAnswer: any;
  importanceObj: any;
  rating: any;
  visible: any;
  setVisible: any;
  setNewAnswer: any;
  answerVisible: any;
};

const ContentLayout = ({
  qList,
  match,
  history,
  editing,
  setEditing,
  newQ,
  setNewQ,
  newAnswer,
  importanceObj,
  rating,
  visible,
  setVisible,
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
          <Col span={4}>
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
      <Layout.Footer css={footerCss}>
        <BottomBtns
          {...{
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
          }}
        />
      </Layout.Footer>
    </React.Fragment>
  );
};

export default ContentLayout;
