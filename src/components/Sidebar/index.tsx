import React, { useState, useEffect, useRef } from 'react';
import { Layout, Button } from 'antd';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  GET_CATEGORIES,
  ADD_CATEGORY,
  GET_QUESTIONS,
  WHAT_SIDEBAR,
} from '../../graphql/queries';
import addDomain from './addDomain';
import addSubdomain from './addSubdomain';
import DomainAddBtn from './DomainAddBtn';
import DomainToggleBtn from './DomainToggleBtn';
import SubdomainAddBtn from './SubdomainAddBtn';
import SubdomainList from './SubdomainList';
import SubdomainAddInput from './SubdomainAddInput';
import SubdomainSaveBtn from './SubdomainSaveBtn';
import SubdomainCancelBtn from './SubdomainCancelBtn';
import DomainSaveBtn from './DomainSaveBtn';
import ImportanceCates from './ImportanceCates';

const { Sider } = Layout;

// hooks 빼기,

function Sidebar() {
  let categories;
  let domains;
  let subDomains;

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

  if (dataCategories && dataCategories.getCategories) {
    domains = Array.from(
      new Set(dataCategories.getCategories.map((elm) => elm.domain)),
    );
    subDomains = domains.map((): any[] => []);
    dataCategories.getCategories.forEach((elm) => {
      const domainIdx = domains.indexOf(elm.domain);
      subDomains[domainIdx].push(elm.subdomain);
    });
    categories = domains.map((elm, key) => {
      return { [elm as any]: subDomains[key] };
      // ts 이해 부족
    });
  }

  if (categories && categories.length > 0) {
    const props = {
      setCategoryAdded,
      inputEl,
      setNewDomain,
      domains,
      addDomain,
      addCategory,
      setSubdomainInputs,
      subdomainInputs,
      setDomainVisible,
      domainVisible,
      setNewSubdomain,
      subDomains,
      addSubdomain,
      categories,
      newSubdomain,
      newDomain,
    };

    return (
      <Sider width={200} className="site-layout-background">
        {dataWhatSidebar && dataWhatSidebar.whatSidebar === 'category' ? (
          <>
            <DomainAddBtn {...props} />
            <ul>
              {categories.map((elm, key) => {
                const newProps = { ...props, idx: key };
                return (
                  <ul key={Object.keys(elm)[0] as any}>
                    <DomainToggleBtn
                      {...{
                        ...newProps,
                        elm,
                      }}
                    />
                    <SubdomainAddBtn {...newProps} />
                    {domainVisible[key]
                      ? Object.values<any>(elm)[0]!.map((ele) => {
                          if (ele.length > 0) {
                            return (
                              // ts 이해 부족
                              <SubdomainList
                                {...{ ele, elm, dataQuestions }}
                                key={ele}
                              />
                            );
                          }
                          return null;
                        })
                      : null}
                    {domainVisible[key] && subdomainInputs[key] ? (
                      <span>
                        <SubdomainAddInput {...newProps} />
                        <SubdomainSaveBtn {...newProps} />
                        <SubdomainCancelBtn {...newProps} />
                      </span>
                    ) : null}
                  </ul>
                );
              })}
              {categoryAdded}
              <span
                style={
                  categoryAdded ? { display: 'inline' } : { display: 'none' }
                }
              >
                <DomainSaveBtn {...props} />
                <Button onClick={() => setCategoryAdded(null)}>취소</Button>
              </span>
            </ul>
          </>
        ) : (
          <ImportanceCates />
        )}
      </Sider>
    );
  }
  return null;
}

export default Sidebar;
