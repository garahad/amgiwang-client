import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Button } from 'antd';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { GET_CATEGORIES, ADD_CATEGORY } from '../graphql/queries';

const { Sider } = Layout;

function Sidebar() {
  let categories;

  const { data: dataCategories } = useQuery(GET_CATEGORIES, {
    variables: { id: 1 },
  });

  const [categoryAdded, setCategoryAdded] = useState<any>(null);
  const [domainVisible, setDomainVisible] = useState<boolean[]>([]);
  const [subdomainInputs, setSubdomainInputs] = useState<boolean[]>([]);
  const [newDomain, setNewDomain] = useState<string>('');
  const [newSubdomain, setNewSubdomain] = useState<string>('');
  const [addCategory] = useMutation(ADD_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES, variables: { id: 1 } }],
    onCompleted: () => {
      setDomainVisible(domainVisible.concat(true));
      setSubdomainInputs(subdomainInputs.concat(false));
    },
  });

  // console.log('dataCategories', dataCategories);
  // console.log('subdomainInputs', subdomainInputs);
  // console.log('domainVisible', domainVisible);

  useEffect(() => {
    if (categories && categories.length > 0 && domainVisible.length === 0) {
      setDomainVisible(Array(categories.length).fill(false));
      setSubdomainInputs(Array(categories.length).fill(false));
    }
  }, [categories, dataCategories, domainVisible]);

  if (dataCategories && dataCategories.getCategories) {
    const categoryDomains = Array.from(
      new Set(dataCategories.getCategories.map((elm) => elm.domain)),
    );
    const subDomains = categoryDomains.map((): any[] => []);
    dataCategories.getCategories.forEach((elm) => {
      const domainIdx = categoryDomains.indexOf(elm.domain);
      subDomains[domainIdx].push(elm.subdomain);
    });
    categories = categoryDomains.map((elm, key) => {
      return { [elm as any]: subDomains[key] };
      // ts 이해 부족
    });
  }

  if (categories && categories.length > 0) {
    console.log('categories', categories);
    return (
      <Sider width={400} className="site-layout-background">
        {/* domain 추가 버튼 */}
        <Button
          onClick={() => {
            setCategoryAdded(
              <span>
                <UserOutlined />
                <input
                  type="text"
                  placeholder="카테고리 입력"
                  onChange={(e) => setNewDomain(e.target.value)}
                />
              </span>,
            );
          }}
        >
          +
        </Button>

        <ul>
          {categories.map((elm, key) => (
            <ul key={key}>
              {/* domain 리스트 토글버튼 */}
              <Button
                onClick={() => {
                  setDomainVisible(
                    domainVisible.map((elme, elmKey) => {
                      if (key === elmKey) {
                        return !elme;
                      }
                      return elme;
                    }),
                  );
                  setSubdomainInputs(
                    subdomainInputs.map((el, elKey) => {
                      if (key === elKey && el) {
                        return false;
                      }
                      return el;
                    }),
                  );
                }}
              >
                <UserOutlined />
                {Object.keys(elm)[0]}
              </Button>
              {/* subdomain 추가 버튼 */}
              <Button
                onClick={() => {
                  setSubdomainInputs(
                    subdomainInputs.map((elme, elmKey) => key === elmKey),
                  );
                  setDomainVisible(
                    domainVisible.map((elme, elmKey) => {
                      if (key === elmKey) {
                        return true;
                      }
                      return elme;
                    }),
                  );
                  // setNowAdding(key);
                }}
              >
                +
              </Button>
              {domainVisible[key]
                ? Object.values<any>(elm)[0]!.map((ele) => {
                    if (ele.length > 0) {
                      return (
                        // ts 이해 부족
                        <li key={ele} style={{ marginLeft: '30px' }}>
                          <Link to={`/solve/${Object.keys(elm)[0]}/${ele}/1`}>
                            {ele}
                          </Link>
                          <Button onClick={() => console.log('문제추가')}>
                            +
                          </Button>
                        </li>
                      );
                    }
                    return null;
                  })
                : null}
              {domainVisible[key] && subdomainInputs[key] ? (
                <span>
                  <input
                    type="text"
                    placeholder="세부 카테고리 입력"
                    style={{ marginLeft: '15px' }}
                    onChange={(e) => setNewSubdomain(e.target.value)}
                  />
                  <Button
                    onClick={() => {
                      addCategory({
                        variables: {
                          user: 1,
                          domain: Object.keys(categories[key])[0],
                          subdomain: newSubdomain,
                        },
                      });
                      setSubdomainInputs(
                        subdomainInputs.map((elme, elmKey) => {
                          if (key === elmKey) {
                            return false;
                          }
                          return elme;
                        }),
                      );
                    }}
                  >
                    저장
                  </Button>
                  <Button
                    onClick={() => {
                      setSubdomainInputs(
                        subdomainInputs.map((elme, elmKey) => {
                          if (key === elmKey) {
                            return false;
                          }
                          return elme;
                        }),
                      );
                    }}
                  >
                    취소
                  </Button>
                </span>
              ) : null}
            </ul>
          ))}
          {categoryAdded}
          <span
            style={categoryAdded ? { display: 'inline' } : { display: 'none' }}
          >
            <Button
              onClick={() => {
                setCategoryAdded(null);
                addCategory({
                  variables: {
                    user: 1,
                    domain: newDomain,
                    subdomain: '',
                  },
                });
              }}
            >
              추가
            </Button>
            <Button onClick={() => setCategoryAdded(null)}>취소</Button>
          </span>
        </ul>
      </Sider>
    );
  }
  return null;
}

export default Sidebar;
