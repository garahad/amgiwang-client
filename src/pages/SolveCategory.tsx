/** @jsx jsx */
import { useEffect, useState } from 'react';
import { css, jsx } from '@emotion/core';
import { Layout, Breadcrumb } from 'antd';
import useSolvePage from '../hooks/useSolvePage';
import ContentLayout from '../components/SolvePage/ContentLayout';
import useCategoryArray from '../hooks/useCategoryArray';
import BreadcrumbDropdown from '../components/SolvePage/BreadcrumbDropdown';
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

type SolveCategoryProps = {
  match: any;
  history: any;
};

function SolveCategory({ match, history }: SolveCategoryProps) {
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

  const [nowDomain, setNowDomain] = useState<string>(match.params.domain);
  const [nowSubDomain, setNowSubDomain] = useState<string>(
    match.params.subdomain,
  );
  const { domains, categories, dataCategories } = useCategoryArray();

  console.log('categories', categories);

  if (errorQuestions) console.log(errorQuestions);

  let subDomains;
  if (categories) {
    subDomains = categories
      .filter((elm) => {
        return Object.keys(elm)[0] === nowDomain;
      })
      .map((el) => Object.values<any>(el)[0]);
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
    setNowDomain(match.params.domain);
    setNowSubDomain(match.params.subdomain);
  }, [match.params.domain, match.params.subdomain]);

  useEffect(() => {
    setRating(importanceNumber);
  }, [importanceNumber, setRating]);

  useEffect(() => {
    setEditing(false);
    setVisible(false);
  }, [setEditing, setVisible, match.params.subdomain]);

  if (qList.length === 0) return null;

  return (
    <Layout css={wrapper}>
      <Breadcrumb css={breadcrumbCss}>
        <Breadcrumb.Item>{task}</Breadcrumb.Item>
        <Breadcrumb.Item>
          {editing ? (
            <BreadcrumbDropdown {...{ domains, setNowDomain, nowDomain }} />
          ) : (
            `${match.params.domain}`
          )}
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {editing ? (
            <BreadcrumbDropdown
              {...{
                domains: subDomains[0],
                setNowDomain: setNowSubDomain,
                nowDomain: nowSubDomain,
              }}
            />
          ) : (
            `${match.params.subdomain}`
          )}
        </Breadcrumb.Item>
        <Breadcrumb.Item>{match.params.qNumber}번 문제</Breadcrumb.Item>
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

export default SolveCategory;
