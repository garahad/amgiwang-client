import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_USERINFO } from '../graphql/queries';

function Home() {
  const { data, error } = useQuery(GET_USERINFO, {
    variables: { id: 1 },
  });
  console.log('data', data);
  console.log('error', error);
  return <div>암기왕과 함께 문제를 풀어보세요! </div>;
}

export default Home;
