import React, { Component } from "react";
import "./App.css";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { IntlProvider } from "react-intl";
import { connect } from "react-redux";
import { Spin } from "antd";
import styled from "styled-components";

import enMessages from "./locales/en.json";
import ltMessages from "./locales/lt.json";

import About from "./pages/AboutPage";
import Home from "./pages/HomePage";
import CreateProductPage from "./pages/CreateProductPage";
import SingleProduct from "./pages/SingleProductPage";
import EditProduct from "./pages/EditProductPage";
import ProductListPage from "./pages/ProductListPage";
import Default from "./pages/Default";

import { Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";

// ==== Context API ====
import { ProductConsumer } from "./context/context";
// ==== Context API ====

const localeMessages = {
  en: enMessages,
  lt: ltMessages,
};

class App extends Component {
  render() {
    const { lang } = this.props;
    return (
      <StyledApp>
        <IntlProvider locale={lang} messages={localeMessages[lang]}>
          <ProductConsumer>
            {(value) => (
              
              <Spin
                spinning={value.loading}
                tip={<div style={{ fontWeight: "bold" }}>Loading...</div>}
              >
                <Navbar />
                <SideBar />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/about" component={About} />
                  <Route
                    exact
                    path="/customers/new"
                    component={CreateProductPage}
                  />
                  <Route exact path="/products/:id" component={SingleProduct} />
                  <Route
                    exact
                    path="/products/:id/edit"
                    component={EditProduct}
                  />
                  <Route path="/customers-list" component={ProductListPage} />
                  <Route component={Default} />
                  <Route path="/" exact component={Home} />
                </Switch>
                <Footer />
              </Spin>
            )}
          </ProductConsumer>
        </IntlProvider>
      </StyledApp>
    );
  }
}

const mapStateToProps = (state) => {
  return { lang: state.lang };
};

const StyledApp = styled.div`
  .ant-spin-nested-loading > div > .ant-spin {
    position: static;
    height: 100%;
  }
`;

export default connect(mapStateToProps)(App);
