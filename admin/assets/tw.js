tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', '"Hind Siliguri"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['13.5px', '20px'],
        base: ['15px', '22px'],
        lg: ['17px', '24px'],
        xl: ['20px', '28px'],
        '2xl': ['24px', '32px']
      },
      colors: {
        ink: {
          DEFAULT: '#1c1a18',
          secondary: '#5e554a',
          muted: '#8a847a'
        },
        stone: {
          50: '#fbfaf8',
          100: '#f5f2eb',
          200: '#ede9e2',
          300: '#ded8ce',
          400: '#b8b0a2',
          500: '#8a847a',
          600: '#5e554a',
          700: '#423c34',
          800: '#2c2722',
          900: '#1c1a18'
        },
        brand: 'var(--brand, #15803d)',
        'brand-hover': 'var(--brand-hover, #166534)',
        'brand-light': 'var(--brand-light, rgba(21, 128, 61, 0.08))'
      },
      borderRadius: {
        DEFAULT: '8px',
        sm: '6px',
        md: '8px',
        lg: '10px',
        xl: '12px',
        '2xl': '14px',
        '3xl': '16px'
      }
    }
  }
};
