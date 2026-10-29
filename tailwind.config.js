/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      sm:  '480px',
      md:  '768px',
      xl:  '1280px',
    },
    // Stitch spec: 4–8 px corner radius. No large rounds except .full for pills only.
    borderRadius: {
      none:    '0',
      DEFAULT: '4px',
      md:      '6px',
      lg:      '8px',
      full:    '9999px',   // pills / avatars only
    },
    extend: {
      colors: {
        // ── Design tokens ────────────────────────────────────
        navy: {
          DEFAULT: '#071B33',   // primary navy
          800:     '#0B2644',   // slightly lighter navy (used in dark panels)
          700:     '#10335A',
          600:     '#0E4E7C',
        },
        ocean: {
          DEFAULT: '#087FC1',   // single primary-action token (Stitch spec)
          dark:    '#066599',
        },
        sky:  { DEFAULT: '#38BDF8' },          // accent highlight
        ice:  { DEFAULT: '#F0F4F8', 200: '#E2E9F1' }, // light section bg
        line: '#CBD5E1',                       // thin slate border
        ink:  '#0F2238',                       // body text
        muted:'#51647A',                       // secondary text
      },
      fontFamily: {
        sans: ['Inter','ui-sans-serif','system-ui','Segoe UI','Roboto',
               'Helvetica Neue','Arial','sans-serif'],
      },
      boxShadow: {
        // Restrained shadows per Stitch spec
        card:  '0 1px 2px rgba(7,27,51,0.06), 0 4px 12px rgba(7,27,51,0.05)',
        lift:  '0 2px 4px rgba(7,27,51,0.08), 0 8px 20px rgba(7,27,51,0.09)',
        heavy: '0 4px 16px rgba(7,27,51,0.14)',
      },
      maxWidth: { shell: '1280px' },
    },
  },
  plugins: [],
}
