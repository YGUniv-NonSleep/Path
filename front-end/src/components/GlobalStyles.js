import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset};
    
    html{
        scroll-behavior: smooth;
    }

    body{
        background-color: #dcdcdc;
        font-family: 'Noto Sans KR', sans-serif;
    }

    a{
        text-decoration: none;
    }
`;

export default GlobalStyles;
