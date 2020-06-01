const addSubdomain = (
  addCategory,
  userId,
  categories,
  key,
  newSubdomain,
  setSubdomainInputs,
  subdomainInputs,
) => {
  addCategory({
    variables: {
      user: userId,
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
};

export default addSubdomain;
