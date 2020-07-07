/** @jsx jsx */
import React, { useEffect } from 'react';
import { jsx } from '@emotion/core';
import { Layout, Breadcrumb } from 'antd';
import useSolvePage from '../hooks/useSolvePage';
import ContentLayout from '../components/SolvePage/ContentLayout';
import BottomBtns from '../components/SolvePage/BottomBtns';
import useCategoryArray from '../hooks/useCategoryArray';
import BreadcrumbDropdown from '../components/SolvePage/BreadcrumbDropdown';
import getSubdomains from '../utils/SolvePage/getSubdomains';
import { breadcrumbCss, footerCss, wrapper } from '../css/emotions';

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
    nowSubDomain,
    setNowSubDomain,
    nowDomain,
    setNowDomain,
  } = useSolvePage();

  const { domains, categories, dataCategories } = useCategoryArray();

  const subDomains = getSubdomains({ categories, nowDomain });

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

  useEffect(() => {
    if (qList && qList.length > 0) {
      setNowDomain(qList[match.params.qNumber - 1].category.domain);
      setNowSubDomain(qList[match.params.qNumber - 1].category.subdomain);
    }
    // eslint-disable-next-line
  }, [qList.length, match.params.qNumber]);

  if (qList.length === 0) return null;

  return (
    <Layout css={wrapper}>
      <Breadcrumb css={breadcrumbCss}>
        <Breadcrumb.Item>{task}</Breadcrumb.Item>
        <Breadcrumb.Item>중요도 {match.params.importance}</Breadcrumb.Item>
        <Breadcrumb.Item>
          {match.params.qNumber}번 문제 &nbsp;
          {editing ? (
            <React.Fragment>
              (<BreadcrumbDropdown {...{ domains, setNowDomain, nowDomain }} />
              &nbsp; / &nbsp;
              <BreadcrumbDropdown
                {...{
                  domains: subDomains[0],
                  setNowDomain: setNowSubDomain,
                  nowDomain: nowSubDomain,
                }}
              />
              )
            </React.Fragment>
          ) : (
            `(${nowDomain} / ${nowSubDomain})`
          )}
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
            setNowDomain,
            nowDomain,
            setNowSubDomain,
            nowSubDomain,
            dataCategories,
          }}
        />
      </Layout.Footer>
    </Layout>
  );
}

export default SolveImportance;
