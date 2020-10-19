import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { IntlProvider } from "react-intl";
import styled from "styled-components";

import "./App.css";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Spin } from "antd";

import enMessages from "./locales/en.json";
import ltMessages from "./locales/lt.json";

import Home from "./pages/HomePage";
import CreateCustomerPage from "./pages/CreateCustomerPage";
import SingleCustomer from "./pages/SingleCustomerPage";
import EditCustomer from "./pages/EditCustomerPage";
import CustomerListPage from "./pages/CustomerListPage";
import Default from "./pages/Default";

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
    return (
      <ProductConsumer>
        {(value) => {
          const { language } = value;
          return (
            <StyledApp>
              <IntlProvider
                locale={language}
                messages={localeMessages[language]}
              >
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
                    <Route
                      exact
                      path="/customer/:id"
                      component={SingleCustomer}
                    />
                    <Route
                      exact
                      path="/customer/:id/edit"
                      component={EditCustomer}
                    />
                    <Route
                      path="/customers-list"
                      component={CustomerListPage}
                    />
                    <Route component={Default} />
                    <Route path="/" exact component={Home} />
                  </Switch>
                  <Footer />
                </Spin>
              </IntlProvider>
            </StyledApp>
          );
        }}
      </ProductConsumer>
    );
  }
}

const StyledApp = styled.div`
  .ant-spin-nested-loading > div > .ant-spin {
    position: static;
    height: 100%;
  }
`;

export default App;
