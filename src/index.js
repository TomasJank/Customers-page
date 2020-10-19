import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "../node_modules/aos/dist/aos.css";

import App from "./App";
import AOS from "aos";

import { BrowserRouter as Router } from "react-router-dom";
import { ProductProvider } from "./context";

ReactDOM.render(
  <ProductProvider>
    <Router>
      <App />
    </Router>
  </ProductProvider>,

  document.getElementById("root")
);

AOS.init({
  duration: 2000,
});
