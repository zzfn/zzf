const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite linear',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
      },
      backgroundSize: {
        shimmer: '1000px 100%',
      },
      fontSize: {
        '2.5xl': ['1.75rem', '2rem'],
      },
      spacing: {
        18: '4.5rem',
      },
      screens: {
        compact: { min: '599px' },
        medium: { min: '600px' },
        expanded: { min: '840px' },
      },
      colors: {
        default: 'var(--fgColor-default)',
        muted: 'var(--fgColor-muted)',
        onEmphasis: 'var(--fgColor-onEmphasis)',
        accent: {
          DEFAULT: 'var(--fgColor-accent)',
          emphasis: 'var(--fgColor-accent-emphasis)',
          muted: 'var(--fgColor-accent-muted)',
        },
        'on-surface': 'var(--md-sys-color-on-surface)',
        glass: 'rgba(255, 255, 255, 0.1)',
        'glass-dark': 'rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glass: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'glass-dark':
          '0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)',
      },
      borderColor: {
        default: 'var(--borderColor-default)',
        muted: 'var(--borderColor-muted)',
        emphasis: 'var(--borderColor-emphasis)',
        'accent-emphasis': 'var(--borderColor-accent-emphasis)',
      },
      backgroundColor: {
        transparent: 'var(--bgColor-transparent)',
        default: 'var(--bgColor-default)',
        muted: 'var(--bgColor-muted)',
        inset: 'var(--bgColor-inset)',
        emphasis: 'var(--bgColor-emphasis)',
        'neutral-muted': 'var(--bgColor-neutral-muted)',
        'secondary-container': 'var(--md-sys-color-secondary-container)',
        'danger-emphasis': 'var(--bgColor-danger-emphasis)',
        'success-muted': 'var(--bgColor-success-muted)',
        accent: {
          default: 'var(--bgColor-accent)',
          emphasis: 'var(--bgColor-accent-emphasis)',
          muted: 'var(--bgColor-accent-muted)',
        },
      },
      backgroundImage: {
        'accent-gradient': 'var(--gradient-accent)',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--fgColor-default)',
            '--tw-prose-headings': 'var(--fgColor-default)',
            '--tw-prose-lead': 'var(--fgColor-default)',
            '--tw-prose-links': 'var(--fgColor-accent)',
            '--tw-prose-bold': 'var(--fgColor-default)',
            '--tw-prose-counters': 'var(--fgColor-default)',
            '--tw-prose-bullets': 'var(--fgColor-default)',
            '--tw-prose-hr': 'var(--borderColor-emphasis)',
            '--tw-prose-quotes': 'var(--fgColor-muted)',
            '--tw-prose-quote-borders': 'var(--borderColor-muted)',
            '--tw-prose-captions': 'var(--fgColor-default)',
            '--tw-prose-code': 'var(--fgColor-severe)',
            '--tw-prose-pre-code': 'var(--codeMirror-fgColor)',
            '--tw-prose-pre-bg': 'var(--bgColor-muted)',
            '--tw-prose-th-borders': 'var(--fgColor-default)',
            '--tw-prose-td-borders': 'var(--fgColor-default)',
            maxWidth: 'auto',
            blockquote: {
              code: {
                color: 'var(--fgColor-severe)',
              },
            },
            pre: {
              overflow: 'initial',
              // paddingBottom: 0,
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
        sans: ['LXGW WenKai Lite', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrainsMono', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
