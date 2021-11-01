module.exports = {
  important: true,
  purge: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      inverse: 'var(--color-text-inverse)',
      brand: 'var(--color-text-brand)',
      primary: 'var(--color-text-primary)',
      secondary: 'var(--color-text-secondary)',
      tertiary: 'var(--color-text-tertiary)',
    },
    backgroundColor: {
      inverse: 'var(--color-bg-inverse)',
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
