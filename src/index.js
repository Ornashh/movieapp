import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { store } from "./store";

import App from "./App";
import "./assets/styles/globalStyles.scss";
import "swiper/swiper-bundle.min.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
