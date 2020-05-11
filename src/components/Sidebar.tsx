import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Button } from 'antd';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { GET_CATEGORIES, ADD_CATEGORY } from '../graphql/queries';

const { Sider } = Layout;

function Sidebar() {
  let categories;

  const [categoryAdded, setCategoryAdded] = useState<any>(null);
  const [domainVisible, setDomainVisible] = useState<boolean[]>([]);
  const [subdomainInputs, setSubdomainInputs] = useState<boolean[]>([]);
  const [newDomain, setNewDomain] = useState<string>('');
  const [newSubdomain, setNewSubdomain] = useState<string>('');
  const inputEl = useRef() as any;

  const { data: dataCategories } = useQuery(GET_CATEGORIES, {
    variables: { id: 1 },
  });
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
  console.log('inputEl', inputEl);

  useEffect(() => {
    if (categories && categories.length > 0 && domainVisible.length === 0) {
      setDomainVisible(Array(categories.length).fill(false));
      setSubdomainInputs(Array(categories.length).fill(false));
    }
  }, [categories, dataCategories, domainVisible]);

  // 비동기 문제 때문에 setTimeout 쓰는 대신에 useEffect 써서 처리
  useEffect(() => {
    if (inputEl && inputEl.current) {
      inputEl.current!.focus();
    }
  }, [inputEl, categoryAdded, subdomainInputs]);

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
    // console.log('categories', categories);
    return (
      <Sider width={400} className="site-layout-background">
        {/* domain 추가 버튼 */}
        <Button
          onClick={() => {
            setCategoryAdded(
              <span>
                <UserOutlined />
                <input
                  ref={inputEl}
                  type="text"
                  placeholder="카테고리 입력"
                  onChange={(e) => setNewDomain(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      // 중복 제거해야
                      setCategoryAdded(null);
                      addCategory({
                        variables: {
                          user: 1,
                          // 아래에서 newDomain으로 하면 인식이 안됨. e.target.value를 쓸 수 밖에. 이것도 한박자씩 늦게 입력되는 듯.
                          domain: (e.target as HTMLInputElement).value,
                          subdomain: '',
                        },
                      });
                    }
                  }}
                />
              </span>,
            );
            setSubdomainInputs(subdomainInputs.map((_) => false));
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
                  setCategoryAdded(null);
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
                    ref={inputEl}
                    placeholder="세부 카테고리 입력"
                    style={{ marginLeft: '15px' }}
                    onChange={(e) => setNewSubdomain(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) {
                        addCategory({
                          variables: {
                            user: 1,
                            domain: Object.keys(categories[key])[0],
                            subdomain: (e.target as HTMLInputElement).value,
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
                      }
                    }}
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
