import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: #1976d2 #0e0e0e;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background: #1976d2;
      border-radius: 5px;
    }
  }
  
  body {
    font-family: "Ubuntu", sans-serif;
    font-weight: 400;
    color: #fff;
    background-color: #0e0e0e;
  }
  
  a {
    text-decoration: none;
  }

  button {
    outline: none;
    border: none;
    background: none;
    cursor: pointer;
  }

  main {
    position: relative;
  }

  .active-tab {
    color: #1976d2 !important;
    background-color: #0e0e0e !important;
  }

  .fade_in {
    animation: fadeIn 0.5s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .swiper-button-next,
  .swiper-button-prev {
    background-color: rgba(0,0,0,0.8);
    top: 0;
    width: auto;
    height: 100%;
    margin: 0;
    padding: 10px;

    &:after {
      font-size: 32px;
    }
    
    @media (max-width: 768px) {
      display: none;
    }
  }
  
  .swiper-button-next {
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
  }

  .lazyLoad {
    width: inherit;
    height: inherit;
    background-color: #1f1f1f;
  }
`;

export default GlobalStyle;
