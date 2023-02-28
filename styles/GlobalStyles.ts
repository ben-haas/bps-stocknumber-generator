import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

  html,
  body {
    height: 100%;
  }

  body {
    font-family: 'Open Sans', sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  .btn {
    font: inherit;
    background-color: #0d47a1;
    border: 1px solid white;
    color: white;
    font-weight: bold;
    padding: 0.5rem 1.5rem;
    border-radius: 6px;
    cursor: pointer;
  }

  .btn:hover {
    background-color: #a1660d;
    color: white;
  }

  #root,
  #__next {
    isolation: isolate;
  }
`;

export default GlobalStyles;
