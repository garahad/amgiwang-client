export const resolvers = {
  Mutation: {
    setSidebar: (_, { status }, { cache }) => {
      cache.writeData({
        data: {
          whatSidebar: status,
        },
      });
      return true;
    },
  },
};
