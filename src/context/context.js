import React, { Component } from "react";

import { customers } from "./customerData";

import { getNextAppId } from "../utils/myUtils";
import { addCustomers, fetchCustomers } from "../api/Customers";
import keys from "../config/keys";

import Geocode from "react-geocode";

Geocode.setApiKey(keys.googleMapApi);

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    sidebarOpen: false,
    customers: [],
    loading: false,
    language: navigator.language.split("-")[0],
  };

  async componentDidMount() {
    !(await fetchCustomers("customers"))
      ? this.setInitialCustomers(customers)
      : this.setCustomers();

    window.addEventListener("click", this.sideBarClickHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.sideBarClickHandler);
  }

  sideBarClickHandler = (e) => {
    if (e.target.parentNode && e.target.parentNode.classList.contains("burger"))
      return;
    this.closeSidebar();
  };

  async setCustomers() {
    const customers = JSON.parse(JSON.parse(await fetchCustomers("customers")));
    this.setState({
      customers,
    });
  }

  setInitialCustomers = async (customersData) => {
    let customers = customersData.map((customerItem) => {
      const id = getNextAppId();
      const name = customerItem.name;
      const email = customerItem.email;
      const city = customerItem.city;
      const street = customerItem.street;
      const houseNumber = customerItem.houseNumber;
      const zip = customerItem.zip;
      const customer = { id, name, email, city, street, houseNumber, zip };
      return customer;
    });
    addCustomers("customers", JSON.stringify(customers));
    this.setState({
      customers,
    });
  };

  addNewCustomer = (item) => {
    const { name, email, city, street, houseNumber, zip } = item;
    const { customers } = this.state;

    const newProduct = {
      id: getNextAppId(),
      name,
      email,
      city,
      street,
      houseNumber,
      zip,
    };

    const newCustomers = [...customers, newProduct];

    this.setState(
      {
        customers: newCustomers,
      },
      () => this.syncCustomersStorage()
    );
  };

  editItem = (editedItem, id) => {
    const { name, email, city, street, houseNumber, zip } = editedItem;
    const newCustomers = this.state.customers.map((item) => {
      if (item.id === id) {
        item.name = name;
        item.email = email;
        item.city = city;
        item.street = street;
        item.houseNumber = houseNumber;
        item.zip = zip;
      }
      return item;
    });

    this.setState(
      {
        customers: newCustomers,
      },
      () => this.syncCustomersStorage()
    );
  };

  syncCustomersStorage = async () => {
    await addCustomers("customers", JSON.stringify(this.state.customers));
  };

  handleSidebar = () => {
    this.setState((prevState) => ({
      sidebarOpen: !prevState.sidebarOpen,
    }));
  };

  closeSidebar = () => {
    this.setState({
      sidebarOpen: false,
    });
  };

  removeItem = (id) => {
    let tempCustomers = [...this.state.customers];
    tempCustomers = tempCustomers.filter((item) => item.id !== id);
    this.setState(
      {
        customers: tempCustomers,
      },
      () => {
        this.syncCustomersStorage();
      }
    );
    return tempCustomers;
  };

  loadPage = (value) => {
    this.setState({ loading: value });
  };

  validateAddress = async (address) => {
    let success = true;
    this.loadPage(true);
    try {
      await Geocode.fromAddress(address);
      this.loadPage(false);
    } catch (e) {
      this.loadPage(false);

      console.error(e);
      success = false;
    }

    return success;
  };

  setLanguage = () => {
    const { language } = this.state;
    this.setState({ language: language === "en" ? "lt" : "en" });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          removeItem: this.removeItem,
          handleSidebar: this.handleSidebar,
          closeSidebar: this.closeSidebar,
          addNewCustomer: this.addNewCustomer,
          editItem: this.editItem,
          loadPage: this.loadPage,
          validateAddress: this.validateAddress,
          setLanguage: this.setLanguage,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductContext, ProductProvider, ProductConsumer };
