module.exports = {
  important: true,
  purge: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    textColor: {
      primary: 'var(--color-primary)',
      secondary: '#ffed4a',
      danger: '#e3342f',
    },
    // extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
