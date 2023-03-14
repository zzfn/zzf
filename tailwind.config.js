const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        "primary":"var(--md-sys-color-primary)",
        "on-primary":"var(--md-sys-color-on-primary)"
      },
      borderColor: {
      },
      backgroundColor: {
        'surface': 'var(--md-sys-color-surface)',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--primary-text)',
            '--tw-prose-headings': 'var(--primary-text)',
            '--tw-prose-lead': 'var(--md-sys-color-primary)',
            '--tw-prose-links': 'var(--md-sys-color-primary)',
            '--tw-prose-bold':  'var(--primary-text)',
            '--tw-prose-counters': 'var(--secondary-text)',
            '--tw-prose-bullets': 'var(--secondary-text)',
            '--tw-prose-hr': 'var(--divider)',
            '--tw-prose-quotes': 'var(--primary-text)',
            '--tw-prose-quote-borders': 'var(--md-sys-color-primary)',
            '--tw-prose-captions': 'var(--primary-text)',
            '--tw-prose-code': 'var(--md-sys-color-primary)',
            '--tw-prose-pre-code': 'var(--primary-text)',
            '--tw-prose-pre-bg': 'var(--comment-background)',
            '--tw-prose-th-borders': 'var(--primary-text)',
            '--tw-prose-td-borders': 'var(--divider)',
            blockquote:{
              code:{
                color: 'var(--md-sys-color-primary)',
              }
            },
            pre:{
              overflow: 'initial',
              paddingBottom: 0,
              code:{
                display: 'block',
                overflowX: 'auto',
                paddingBottom: '0.8571429em',
              }
            }
          },
        },
      },
      fontFamily: {
        'mono': ['JetBrainsMono', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
