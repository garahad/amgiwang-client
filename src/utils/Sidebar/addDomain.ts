const addDomain = (setCategoryAdded, addCategory, userId, newDomain) => {
  setCategoryAdded(null);
  addCategory({
    variables: {
      user: userId,
      // 아래에서 newDomain으로 하면 인식이 안됨. e.target.value를 쓸 수 밖에. 이것도 한박자씩 늦게 입력되는 듯.
      domain: newDomain,
      subdomain: '',
    },
  });
};

export default addDomain;
