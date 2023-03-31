import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button from '../Button';
import { ThemeProvider } from '@emotion/react';
import theme, { AppTheme } from '../../../styles/theme';

describe('Button', () => {
  it('renders button with correct color and text', () => {
    render(
      <ThemeProvider theme={theme}>
        <Button color='primary'>Test Button</Button>
      </ThemeProvider>
    );

    const button = screen.getByText('Test Button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle(`background-color: ${theme.colors.primary}`);
    expect(button).toHaveStyle(`color: ${theme.colors.background}`);
  });

  it('renders outlined button', () => {
    render(
      <ThemeProvider theme={theme}>
        <Button color='primary' outlined>
          Test Button
        </Button>
      </ThemeProvider>
    );

    const button = screen.getByText('Test Button');
    expect(button).toHaveStyle('background-color: transparent');
    expect(button).toHaveStyle(`color: ${theme.colors.primary}`);
  });

  it('renders ghost button', () => {
    render(
      <ThemeProvider theme={theme}>
        <Button color='primary' ghost>
          Test Button
        </Button>
      </ThemeProvider>
    );

    const button = screen.getByText('Test Button');
    expect(button).toHaveStyle('background-color: transparent');
    expect(button).toHaveStyle(`color: ${theme.colors.primary}`);
    expect(button).toHaveStyle('border: transparent 1.5px solid');
  });

  it('renders circle button', () => {
    render(
      <ThemeProvider theme={theme}>
        <Button color='primary' circle>
          Test Button
        </Button>
      </ThemeProvider>
    );

    const button = screen.getByText('Test Button');
    expect(button).toHaveStyle('border-radius: 50%');
  });

  it('renders full-width button', () => {
    render(
      <ThemeProvider theme={theme}>
        <Button color='primary' fullWidth>
          Test Button
        </Button>
      </ThemeProvider>
    );

    const button = screen.getByText('Test Button');
    expect(button).toHaveStyle('width: 100%');
  });
});
