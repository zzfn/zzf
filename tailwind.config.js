module.exports = {
  important: true,
  purge: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: 'var(--color-primary)',
      colorBorderSecondary: 'var(--color-border-secondary)',
      primary4: 'var(--color-scale-orange-4)',
      primary5: 'var(--color-scale-orange-5)',
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
