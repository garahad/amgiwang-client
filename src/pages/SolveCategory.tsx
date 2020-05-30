/** @jsx jsx */
import { useEffect } from 'react';
import { css, jsx } from '@emotion/core';
import { Layout, Breadcrumb } from 'antd';
import useSolvePage from '../hooks/useSolvePage';
import ContentLayout from '../components/SolvePage/ContentLayout';

const wrapper = css`
  padding: 0 24px 24px;
`;
const breadcrumbCss = css`
  margin: 16px 0;
`;

type SolveCategoryProps = {
  match: any;
  history: any;
};

function SolveCategory({ match, history }: SolveCategoryProps) {
  const {
    answerVisible,
    task,
    importanceObj,
    error,
    dataQuestions,
    setNewAnswer,
    newAnswer,
    setNewQ,
    newQ,
    setEditing,
    editing,
    setVisible,
    visible,
    setRating,
    rating,
  } = useSolvePage();

  if (error) console.log(error);

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
  }, [importanceNumber, setRating]);

  useEffect(() => {
    setEditing(false);
    setVisible(false);
  }, [setEditing, setVisible, match.params.subdomain]);

  console.log('editing, visible', editing, visible);

  if (qList.length === 0) return null;

  return (
    <Layout css={wrapper}>
      <Breadcrumb css={breadcrumbCss}>
        <Breadcrumb.Item>{task}</Breadcrumb.Item>
        <Breadcrumb.Item>{match.params.domain}</Breadcrumb.Item>
        <Breadcrumb.Item>{match.params.subdomain}</Breadcrumb.Item>
        <Breadcrumb.Item>{match.params.qNumber}번 문제</Breadcrumb.Item>
      </Breadcrumb>
      <ContentLayout
        {...{
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
        }}
      />
    </Layout>
  );
}

export default SolveCategory;
