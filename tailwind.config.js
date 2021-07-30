module.exports = {
  important: true,
  purge: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: 'var(--color-primary)',
      colorBorderSecondary: 'var(--color-border-secondary)',
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
