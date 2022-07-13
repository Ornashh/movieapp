import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { store } from "./store";

import App from "./App";
import "./assets/styles/globalStyles.scss";
import "swiper/swiper-bundle.min.css";
import "react-lazy-load-image-component/src/effects/blur.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
