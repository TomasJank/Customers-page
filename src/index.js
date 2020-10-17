import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "../node_modules/aos/dist/aos.css";

import App from "./App";
import AOS from "aos";

import { BrowserRouter as Router } from "react-router-dom";
import { ProductProvider } from "./context";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store().store}>
    <PersistGate loading={null} persistor={store().persistor}>
      <ProductProvider>
        <Router>
          <App />
        </Router>
      </ProductProvider>
    </PersistGate>
  </Provider>,

  document.getElementById("root")
);

AOS.init({
  duration: 2000,
});
