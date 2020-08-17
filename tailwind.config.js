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
  purge: {
    content: ['./src/**/*.html', './src/**/*.re', './src/**/*.bs.js'],
  },
};
