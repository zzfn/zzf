const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ './src/**/*.{js,ts,jsx,tsx,mdx}',],
  theme: {
    extend: {
      fontSize: {
        '2.5xl': ['1.75rem', '2rem'],
      },
      spacing: {
        18: '4.5rem',
      },
      screens: {
        compact: {'min':'599px'},
        medium: {'min': '600px'},
        expanded: {'min': '840px'},
      },
      colors: {
        'default': 'var(--fgColor-default)',
        'muted': 'var(--fgColor-muted)',
        'accent': 'var(--fgColor-accent)',
        'on-surface': 'var(--md-sys-color-on-surface)',
      },
      borderColor: {
        'default': 'var(--borderColor-default)',
        'muted': 'var(--borderColor-muted)',
        'emphasis': 'var(--borderColor-emphasis)',
        'accent-emphasis': 'var(--borderColor-accent-emphasis)',
      },
      backgroundColor: {
        default: 'var(--bgColor-default)',
        'muted': 'var(--bgColor-muted)',
        'emphasis': 'var(--bgColor-emphasis)',
        'neutral-muted': 'var(--bgColor-neutral-muted)',
        'secondary-container': 'var(--md-sys-color-secondary-container)',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--md-sys-color-on-surface)',
            '--tw-prose-headings': 'var(--md-sys-color-on-surface)',
            '--tw-prose-lead': 'var(--fgColor-default)',
            '--tw-prose-links': 'var(--fgColor-accent)',
            '--tw-prose-bold': 'var(--md-sys-color-on-surface)',
            '--tw-prose-counters': 'var(--secondary-text)',
            '--tw-prose-bullets': 'var(--secondary-text)',
            '--tw-prose-hr': 'var(--divider)',
            '--tw-prose-quotes': 'var(--md-sys-color-on-surface)',
            '--tw-prose-quote-borders': 'var(--md-sys-color-primary)',
            '--tw-prose-captions': 'var(--md-sys-color-on-surface)',
            '--tw-prose-code': 'var(--md-sys-color-primary)',
            '--tw-prose-pre-code': 'var(--md-sys-color-on-surface)',
            '--tw-prose-pre-bg': 'var(--bgColor-muted)',
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
  plugins: [require('@tailwindcss/typography')],
};
