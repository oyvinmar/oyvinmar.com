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
  variants: {
    backgroundColor: ['hover', 'responsive', ' focus', 'dark', 'dark-hover'],
    textColor: ['hover', 'responsive', 'focus', 'dark', 'dark-hover'],
  },
  purge: {
    content: ['./src/**/*.html', './src/**/*.re', './src/**/*.bs.js'],
    options: {
      whitelist: ['mode-dark'],
    },
  },
  plugins: [require('tailwindcss-dark-mode')()],
};
