const getSubdomains = ({ categories, nowDomain }) => {
  let subDomains;
  if (categories) {
    subDomains = categories
      .filter((elm) => {
        return Object.keys(elm)[0] === nowDomain;
      })
      .map((el) => Object.values<any>(el)[0]);
  }
  return subDomains;
};

export default getSubdomains;
