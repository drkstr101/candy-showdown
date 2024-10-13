const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: ({ colors }) => ({
        white: '#fafafa',
        black: '#0a0a0a',
        neutral: colors.neutral,
        primary: colors.teal,
        secondary: colors.blue,
        accent: colors.cyan,
        danger: colors.rose,
        warning: colors.amber,
        success: colors.emerald,
        info: colors.sky,
      }),
      fontSize: {
        xxs: '10px',
        xs: 'var(--text-xs)',
        sm: 'var(--text-sm)',
        md: 'var(--text-md)',
        lg: 'var(--text-lg)',
        xl: 'var(--text-xl)',
      },
      minWidth: {
        btn: '160px',
      },
      fontFamily: {
        sans: 'Inter',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
