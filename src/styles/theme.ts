const theme = {
  colors: {
    primary: '#81A1C1',
    secondary: '#D08770',
    background: '#ECEFF4',
    text: {
      primary: '#2E3440',
      secondary: '#4C566A',
    },
    success: '#A3BE8C',
    error: '#BF616A',
    accent: '#88C0D0',
    // Additional Nord theme colors
    nord0: '#2E3440',
    nord1: '#3B4252',
    nord2: '#434C5E',
    nord3: '#4C566A',
    nord4: '#D8DEE9',
    nord5: '#E5E9F0',
    nord6: '#ECEFF4',
    nord7: '#8FBCBB',
    nord8: '#88C0D0',
    nord9: '#81A1C1',
    nord10: '#5E81AC',
    nord11: '#BF616A',
    nord12: '#D08770',
    nord13: '#EBCB8B',
    nord14: '#A3BE8C',
    nord15: '#B48EAD',
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    fontSize: {
      base: '16px',
      small: '14px',
      large: '18px',
      h1: '32px',
      h2: '24px',
      h3: '20px',
    },
  },
  spacing: {
    base: '1rem',
    small: '0.5rem',
    large: '1.5rem',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    base: '16px',
    large: '32px',
  },
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
  },
  containerSizes: {
    sm: '540px',
    md: '720px',
    lg: '960px',
    xl: '1140px',
    xxl: '1320px',
  },
} as const;

export default theme;
export type AppTheme = typeof theme;
