import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Button } from 'antd';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { GET_CATEGORIES, ADD_CATEGORY } from '../../graphql/queries';
import addDomain from './addDomain';
import addSubdomain from './addSubdomain';

const { Sider } = Layout;

// hooks 빼기, //button 등 component들 빼기

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

  // 비동기 문제 때문에 setTimeout 쓰는 대신에 useEffect 써서 처리
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
    // console.log('categories', categories);
    console.log('newDomain', newDomain);
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
                      if ((e.target as HTMLInputElement).value.length === 0) {
                        alert('카테고리 이름은 1글자 이상이어야 합니다');
                      } else if (
                        domains.indexOf(
                          (e.target as HTMLInputElement).value,
                        ) === -1
                      ) {
                        addDomain(
                          setCategoryAdded,
                          addCategory,
                          1,
                          (e.target as HTMLInputElement).value,
                        );
                      } else {
                        alert('카테고리 이름 중복입니다');
                      }
                    }
                  }}
                />
              </span>,
            );
            setSubdomainInputs(subdomainInputs.map(() => false));
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
                      // 아래 코드와 중복을 제거하는 문제
                      if (e.keyCode === 13) {
                        if ((e.target as HTMLInputElement).value.length === 0) {
                          alert('subdomain은 1글자 이상이어야 합니다');
                        } else if (
                          subDomains[key].indexOf(
                            (e.target as HTMLInputElement).value,
                          ) !== -1
                        ) {
                          alert('subdomain 이름 중복입니다');
                        } else {
                          addSubdomain(
                            addCategory,
                            1,
                            categories,
                            key,
                            (e.target as HTMLInputElement).value,
                            setSubdomainInputs,
                            subdomainInputs,
                          );
                        }
                      }
                    }}
                  />
                  <Button
                    onClick={() => {
                      if (newSubdomain.length === 0) {
                        alert('subdomain은 1글자 이상이어야 합니다');
                      } else if (subDomains[key].indexOf(newSubdomain) !== -1) {
                        alert('subdomain 이름 중복입니다');
                      } else {
                        addSubdomain(
                          addCategory,
                          1,
                          categories,
                          key,
                          newSubdomain,
                          setSubdomainInputs,
                          subdomainInputs,
                        );
                      }
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
                if (newDomain.length === 0) {
                  alert('카테고리 이름은 1글자 이상이어야 합니다');
                } else if (domains.indexOf(newDomain) === -1) {
                  addDomain(setCategoryAdded, addCategory, 1, newDomain);
                } else {
                  alert('카테고리 이름 중복입니다');
                }
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
