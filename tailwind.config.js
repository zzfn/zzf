module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        'primary-1': 'var(--color-primary-1)',
        'primary-2': 'var(--color-primary-2)',
        'primary-3': 'var(--color-primary-3)',
        'primary-4': 'var(--color-primary-4)',
        'neutral-1': 'var(--color-neutral-4)',
        'neutral-2': 'var(--color-neutral-6)',
        'neutral-3': 'var(--color-neutral-8)',
        'neutral-4': 'var(--color-neutral-10)',
        'link-1': 'var(--color-link-1)',
        'link-2': 'var(--color-link-2)',
        'link-3': 'var(--color-link-3)',
        'link-4': 'var(--color-link-4)',
        primary: 'var(--primary-text)',
        secondary: 'var(--secondary-text)',
        link: 'var(--blue-link)',
      },
      borderColor: {
        'neutral-1': 'var(--color-border-1)',
        'neutral-2': 'var(--color-border-2)',
        'neutral-3': 'var(--color-border-3)',
        'neutral-4': 'var(--color-border-4)',
        surface: 'var(--surface-background)',
      },
      backgroundColor: {
        'neutral-1': 'var(--color-fill-1)',
        'neutral-2': 'var(--color-fill-2)',
        'neutral-3': 'var(--color-fill-3)',
        'neutral-4': 'var(--color-fill-4)',
        surface: 'var(--surface-background)',
        comment: 'var(--comment-background)',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--primary-text)',
            '--tw-prose-headings': 'var(--primary-text)',
            '--tw-prose-lead': 'var(--accent)',
            '--tw-prose-links': 'var(--accent)',
            '--tw-prose-bold':  'var(--primary-text)',
            '--tw-prose-counters': 'var(--secondary-text)',
            '--tw-prose-bullets': 'var(--secondary-text)',
            '--tw-prose-hr': 'var(--divider)',
            '--tw-prose-quotes': 'var(--primary-text)',
            '--tw-prose-quote-borders': 'var(--accent)',
            '--tw-prose-captions': 'var(--primary-text)',
            '--tw-prose-code': 'var(--primary-text)',
            '--tw-prose-pre-code': 'var(--primary-text)',
            '--tw-prose-pre-bg': 'var(--comment-background)',
            '--tw-prose-th-borders': 'var(--primary-text)',
            '--tw-prose-td-borders': 'var(--divider)',
            code:{
              fontFamily: 'JetBrainsMono'
            },
            pre:{
              overflow: 'initial',
              paddingBottom: 0,
              code:{
                display: 'block',
                overflowX: 'auto',
                fontFamily: 'JetBrainsMono',
                paddingBottom: '0.8571429em',
              }
            }
          },
        },
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
