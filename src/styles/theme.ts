const theme = {
  colors: {
    primary: '#000022', // Oxford Blue
    secondary: '#e28413', // Fulvous
    background: '#fbf5f3', // Snow
    text: {
      primary: '#000022', // Oxford Blue
      secondary: '#757575', // Gray (unchanged)
    },
    success: '#c42847', // Cardinal
    error: '#de3c4b', // Rusty Red
    accent: '#e28413', // Fulvous (can be changed if desired)
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
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
    base: '4px',
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
};

export default theme;
export type AppTheme = typeof theme;
