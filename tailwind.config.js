module.exports = {
  content: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  theme: {
    colors: {
      info: 'var(--color-text-info)',
      primary: 'var(--color-text-primary)',
      secondary: 'var(--color-text-secondary)',
      tertiary: 'var(--color-text-tertiary)',
      'gray-100': 'var(--color-gray-100)',
      'gray-200': 'var(--color-gray-200)',
      'gray-300': 'var(--color-gray-300)',
      'gray-400': 'var(--color-gray-400)',
      'gray-500': 'var(--color-gray-500)',
      'gray-600': 'var(--color-gray-600)',
      'gray-700': 'var(--color-gray-700)',
      'gray-800': 'var(--color-gray-800)',
      'gray-900': 'var(--color-gray-900)',
      'gray-1000': 'var(--color-gray-1000)',
    },
    backgroundColor: {
      primary: 'var(--color-bg-primary)',
      secondary: 'var(--color-bg-secondary)',
      tertiary: 'var(--color-bg-tertiary)',
      decorative: 'var(--color-bg-decorative)',
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
