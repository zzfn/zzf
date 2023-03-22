const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontSize: {
        '2.5xl': ['1.75rem', '2rem'],
      },
      spacing: {
        18: '4.5rem',
      },
      screens: {
        tablet: '640px',
        laptop: '1024px',
        desktop: '961px',
      },
      colors: {
        primary: 'var(--md-sys-color-primary)',
        'on-primary': 'var(--md-sys-color-on-primary)',
        'on-secondary': 'var(--md-sys-color-on-secondary)',
        'on-surface': 'var(--md-sys-color-on-surface)',
      },
      borderColor: {},
      backgroundColor: {
        surface: 'var(--md-sys-color-surface)',
        'surface-1': 'var(--md-sys-color-surface-1)',
        'surface-5': 'var(--md-sys-color-surface-5)',
        'secondary-container': 'var(--md-sys-color-secondary-container)',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--md-sys-color-on-surface)',
            '--tw-prose-headings': 'var(--md-sys-color-on-surface)',
            '--tw-prose-lead': 'var(--md-sys-color-primary)',
            '--tw-prose-links': 'var(--md-sys-color-primary)',
            '--tw-prose-bold': 'var(--md-sys-color-on-surface)',
            '--tw-prose-counters': 'var(--secondary-text)',
            '--tw-prose-bullets': 'var(--secondary-text)',
            '--tw-prose-hr': 'var(--divider)',
            '--tw-prose-quotes': 'var(--md-sys-color-on-surface)',
            '--tw-prose-quote-borders': 'var(--md-sys-color-primary)',
            '--tw-prose-captions': 'var(--md-sys-color-on-surface)',
            '--tw-prose-code': 'var(--md-sys-color-primary)',
            '--tw-prose-pre-code': 'var(--md-sys-color-on-surface)',
            '--tw-prose-pre-bg': 'var(--md-sys-color-surface-1)',
            '--tw-prose-th-borders': 'var(--md-sys-color-on-surface)',
            '--tw-prose-td-borders': 'var(--divider)',
            maxWidth: 'auto',
            blockquote: {
              code: {
                color: 'var(--md-sys-color-primary)',
              },
            },
            pre: {
              overflow: 'initial',
              paddingBottom: 0,
              code: {
                display: 'block',
                overflowX: 'auto',
                paddingBottom: '0.8571429em',
              },
            },
          },
        },
      },
      fontFamily: {
        mono: ['JetBrainsMono', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/line-clamp')],
};
