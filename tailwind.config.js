module.exports = {
  content: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  theme: {
    colors: {
      brand: 'var(--color-text-brand)',
      info: 'var(--color-text-info)',
      primary: 'var(--color-text-primary)',
      secondary: 'var(--color-text-secondary)',
      tertiary: 'var(--color-text-tertiary)',
    },
    backgroundColor: {
      brand: 'var(--color-bg-brand)',
      primary: 'var(--color-bg-primary)',
      secondary: 'var(--color-bg-secondary)',
      tertiary: 'var(--color-bg-tertiary)',
    },
    borderColor: {
      primary: 'var(--color-border-primary)',
      secondary: 'var(--color-border-secondary)',
      tertiary: 'var(--color-border-tertiary)',
    },
    // extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
