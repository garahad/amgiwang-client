/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  GET_CATEGORIES,
  ADD_CATEGORY,
  GET_QUESTIONS,
  WHAT_SIDEBAR,
} from '../../graphql/queries';
import addDomain from '../../utils/Sidebar/addDomain';
import addSubdomain from '../../utils/Sidebar/addSubdomain';
import DomainAddBtn from './DomainAdd/DomainAddBtn';
import DomainAndBtns from './DomainAndBtns';
import SubdomainList from './SubdomainList';
import SubdomainAddInput from './SubdomainAdd/SubdomainAddInput';
import ImportanceCates from './ImportanceCates';
import useCategoryArray from '../../hooks/useCategoryArray';

const { Sider } = Layout;

const domainUl = css`
  list-style-type: disc;
`;

// hooks 빼기,

type SidebarProps = {
  match: any;
  location: any;
  history: any;
};

function Sidebar({ location, history }: SidebarProps) {
  const [categoryAdded, setCategoryAdded] = useState<any>(null);
  const [domainVisible, setDomainVisible] = useState<boolean[]>([]);
  const [subdomainInputs, setSubdomainInputs] = useState<boolean[]>([]);
  const [newDomain, setNewDomain] = useState<string>('');
  const [newSubdomain, setNewSubdomain] = useState<string>('');
  const inputEl = useRef() as any;

  const { data: dataCategories } = useQuery(GET_CATEGORIES, {
    variables: { id: 1 },
  });
  const { data: dataQuestions } = useQuery(GET_QUESTIONS, {
    variables: { id: 1 },
  });
  const { data: dataWhatSidebar } = useQuery(WHAT_SIDEBAR);
  const [addCategory] = useMutation(ADD_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES, variables: { id: 1 } }],
    onCompleted: () => {
      setDomainVisible(domainVisible.concat(true));
      setSubdomainInputs(subdomainInputs.concat(false));
    },
  });

  const { categories, domains, allSubDomains } = useCategoryArray();

  useEffect(() => {
    if (categories && categories.length > 0 && domainVisible.length === 0) {
      setDomainVisible(Array(categories.length).fill(false));
      setSubdomainInputs(Array(categories.length).fill(false));
    }
  }, [categories, dataCategories, domainVisible]);

  useEffect(() => {
    if (inputEl && inputEl.current) {
      inputEl.current!.focus();
    }
  }, [inputEl, categoryAdded, subdomainInputs]);

  if (categories && categories.length > 0) {
    const props = {
      setCategoryAdded,
      inputEl,
      domains,
      addDomain,
      addCategory,
      setSubdomainInputs,
      subdomainInputs,
      setDomainVisible,
      domainVisible,
      newSubdomain,
      setNewSubdomain,
      allSubDomains,
      addSubdomain,
      categories,
      newDomain,
      setNewDomain,
      dataQuestions,
      dataCategories,
      location,
      history,
    };

    return (
      <Sider width="40%" className="site-layout-background">
        {dataWhatSidebar && dataWhatSidebar.whatSidebar === 'category' ? (
          <React.Fragment>
            <DomainAddBtn {...{ ...props, props }} />
            <ul>
              {categories.map((elm, key) => {
                const newProps = { ...props, idx: key };
                return (
                  <ul key={Object.keys(elm)[0] as any} css={domainUl}>
                    <DomainAndBtns
                      {...{
                        ...newProps,
                        elm,
                        newProps,
                      }}
                    />

                    {domainVisible[key]
                      ? Object.values<any>(elm)[0]!.map((ele) => {
                          if (ele.length > 0) {
                            return (
                              // ts 이해 부족
                              <SubdomainList
                                {...{
                                  ...props,
                                  ele,
                                  elm,
                                }}
                                key={ele}
                              />
                            );
                          }
                          return null;
                        })
                      : null}
                    {domainVisible[key] && subdomainInputs[key] ? (
                      <SubdomainAddInput {...{ ...newProps, newProps }} />
                    ) : null}
                  </ul>
                );
              })}
              {categoryAdded}
            </ul>
          </React.Fragment>
        ) : (
          <ImportanceCates />
        )}
      </Sider>
    );
  }
  return null;
}

export default withRouter(Sidebar);
