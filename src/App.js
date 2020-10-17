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

import Home from "./pages/HomePage";
import CreateCustomerPage from "./pages/CreateCustomerPage";
import SingleCustomer from "./pages/SingleCustomerPage";
import EditCustomer from "./pages/EditCustomerPage";
import CustomerListPage from "./pages/CustomerListPage";
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
                  <Route
                    exact
                    path="/customer/new"
                    component={CreateCustomerPage}
                  />
                  <Route exact path="/customer/:id" component={SingleCustomer} />
                  <Route
                    exact
                    path="/customer/:id/edit"
                    component={EditCustomer}
                  />
                  <Route path="/customers-list" component={CustomerListPage} />
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
