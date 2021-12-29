import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppProvider } from "./context";

import "./index.scss";
import "swiper/swiper-bundle.min.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App/>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
