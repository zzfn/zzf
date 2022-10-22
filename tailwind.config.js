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
    },
  },
};
