module.exports = {
  content: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        'brand-primary': 'var(--color-primary-4)',
        'brand-secondary': 'var(--color-secondary)',
        info: 'var(--color-text-info)',
        primary: 'var(--color-primary-4)',
        secondary: 'var(--color-text-secondary)',
        tertiary: 'var(--color-text-tertiary)',
        neutral3: 'var(--color-neutral-3)',
      },
      backgroundColor: {
        primary: 'var(--color-bg-primary)',
        default: 'var(--color-bg-default)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
