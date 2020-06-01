import { useQuery } from '@apollo/react-hooks';
import { GET_CATEGORIES } from '../graphql/queries';

const useCategoryArray = () => {
  let categories;
  let domains;
  let subDomains;

  const { data: dataCategories } = useQuery(GET_CATEGORIES, {
    variables: { id: 1 },
  });

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

  return {
    domains,
    subDomains,
    categories,
    dataCategories,
  };
};

export default useCategoryArray;
