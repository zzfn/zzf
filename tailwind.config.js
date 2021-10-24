module.exports = {
  important: true,
  purge: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primaryText: 'var(--color-text-primary)',
      secondaryText: 'var(--color-text-secondary)',
      primary4: 'var(--color-text-primary)',
      primary5: 'var(--color-scale-orange-5)',
      danger: '#e3342f',
    },
    // extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
