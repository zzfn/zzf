module.exports = {
  content: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  theme: {
    colors: {
      info: 'var(--color-text-info)',
      primary: 'var(--color-text-primary)',
      secondary: 'var(--color-text-secondary)',
      tertiary: 'var(--color-text-tertiary)',
    },
    backgroundColor: {
      primary: 'var(--color-bg-primary)',
      default: 'var(--color-bg-default)',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
