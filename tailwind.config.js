module.exports = {
  theme: {
    extend: {
      gridTemplateColumns: {
        dl: 'max-content minmax(0, 1fr)',
      },
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      sidebar: '#d3dee0',
    }),
  },
};
