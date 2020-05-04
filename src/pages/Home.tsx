import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_USERINFO } from '../graphql/queries';

function Home() {
  const { data: dataMe, error } = useQuery(GET_USERINFO, {
    variables: { id: 1 },
  });
  // console.log('data', dataMe.getUser.nick);
  if (error) console.log('error', error);
  return (
    <div>
      <div>
        {dataMe && dataMe.getUser
          ? `${dataMe.getUser.nick}님 안녕하세요`
          : null}
      </div>
      암기왕과 함께 문제를 풀어보세요!{' '}
    </div>
  );
}

export default Home;
