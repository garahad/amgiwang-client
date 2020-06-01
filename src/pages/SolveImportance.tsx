/** @jsx jsx */
import { useEffect } from 'react';
import { css, jsx } from '@emotion/core';
import { Layout, Breadcrumb } from 'antd';
import useSolvePage from '../hooks/useSolvePage';
import ContentLayout from '../components/SolvePage/ContentLayout';
import BottomBtns from '../components/SolvePage/BottomBtns';
import useCategoryArray from '../hooks/useCategoryArray';

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
  const {
    answerVisible,
    task,
    importanceObj,
    errorQuestions,
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

  const { dataCategories } = useCategoryArray();

  if (errorQuestions) console.log(errorQuestions);

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
  }, [match.params.importance, setRating]);

  useEffect(() => {
    setEditing(false);
    setVisible(false);
  }, [setEditing, setVisible, match.params.importance]);

  let nowDomain;
  let nowSubDomain;
  if (qList && qList.length > 0) {
    nowDomain = qList[match.params.qNumber].category.domain;
    nowSubDomain = qList[match.params.qNumber].category.subdomain;
  }

  if (qList.length === 0) return null;

  return (
    <Layout css={wrapper}>
      <Breadcrumb css={breadcrumbCss}>
        <Breadcrumb.Item>{task}</Breadcrumb.Item>
        <Breadcrumb.Item>중요도 {match.params.importance}</Breadcrumb.Item>
        <Breadcrumb.Item>
          {match.params.qNumber}번 문제{' '}
          {`(${qList[match.params.qNumber].category.domain} / ${
            qList[match.params.qNumber].category.subdomain
          })`}
        </Breadcrumb.Item>
      </Breadcrumb>
      <ContentLayout
        {...{
          qList,
          match,
          history,
          editing,
          setNewQ,
          setNewAnswer,
          answerVisible,
        }}
      />
      <Layout.Footer css={footerCss}>
        <BottomBtns
          {...{
            match,
            history,
            qList,
            rating,
            setRating,
            visible,
            setVisible,
            editing,
            setEditing,
            newQ,
            newAnswer,
            importanceObj,
            nowDomain,
            nowSubDomain,
            dataCategories,
          }}
        />
      </Layout.Footer>
    </Layout>
  );
}

export default SolveImportance;
