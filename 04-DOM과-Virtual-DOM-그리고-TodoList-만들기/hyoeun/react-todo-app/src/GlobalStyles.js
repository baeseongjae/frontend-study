import { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset};

  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap'); 
  
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0 ;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "IBM Plex Mono", monospace;
    background-color: #2a2a2a;
  } 
  input {
    font-family: "IBM Plex Mono", monospace;
    letter-spacing: 1.5px;
    font-size: 1rem;
  }
  button {
    cursor: pointer;
    border: none;
    background: none;
  }
`;

export default GlobalStyle;
