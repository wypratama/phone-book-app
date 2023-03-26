// src/styles/globalStyles.ts
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import theme from './theme';

const globalStyle = css`
  /* Minimal CSS Reset */
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol,
  ul {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* Apply background color to the body */
  body {
    background-color: ${theme.colors.background};
    color: ${theme.colors.text.primary};
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.typography.fontSize.base};
    line-height: 1.5;
  }

  /* Apply heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${theme.colors.primary};
  }

  h1 {
    font-size: ${theme.typography.fontSize.h1};
  }

  h2 {
    font-size: ${theme.typography.fontSize.h2};
  }

  h3 {
    font-size: ${theme.typography.fontSize.h3};
  }

  /* Apply link styles */
  a {
    color: ${theme.colors.primary};
    text-decoration: none;
  }

  a:hover {
    color: ${theme.colors.accent};
    text-decoration: underline;
  }

  button {
    border: 1px solid transparent;
    font-family: inherit;
    cursor: pointer;
  }
`;

export default globalStyle;
