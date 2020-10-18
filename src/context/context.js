import React, { Component } from "react";
import { linkData } from "./linkData";

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
    links: linkData,
    customers: [],
    search: "",
    filteredCustomers: [],
    singleCustomer: "",
    loading: false,
    language: navigator.language.split("-")[0],
  };

  async componentDidMount() {
    !(await fetchCustomers("customers"))
      ? this.setInitialCustomers(customers)
      : this.setCustomers();

    window.addEventListener("click", this.sideBarClickHandler);
  }

  async componentDidUpdate() {
    // console.log('testing', await fetchCustomers("customers"))

    // console.log("localForage", localforage)
    console.log("singleCustomer", this.state.singleCustomer);
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
    console.log('setCustomers', customers)
    this.setState({
      customers,
      filteredCustomers: customers,
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
      console.log("id is ", id)
      const customer = { id, name, email, city, street, houseNumber, zip };
      console.log("initial customer", customer)
      return customer;

    });
    console.log("initial initial customer", customers)
    // localStorage.setItem("customers", JSON.stringify(customers));
    addCustomers("customers", JSON.stringify(customers));
    this.setState({
      customers,
      filteredCustomers: customers,
      singleCustomer: this.getStorageCustomer(),
    });
  };

  addNewProduct = (item) => {
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

    const newcustomers = [...customers, newProduct];

    this.setState(
      {
        customers: newcustomers,
        filteredCustomers: newcustomers,
        singleCustomer: this.getStorageCustomer(),
      },
      () => this.syncCustomersStorage()
    );
  };

  getStorageCustomer = async () => {
    return (await fetchCustomers("singleCustomer"))
      ? JSON.parse(JSON.parse(fetchCustomers("singleCustomer")))
      : {};
  };

  editItem = (editedItem, id) => {
    const { name, email, city, street, houseNumber, zip } = editedItem;
    const newcustomers = this.state.customers.map((item) => {
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
        customers: newcustomers,
        filteredCustomers: newcustomers,
      },
      () => this.syncCustomersStorage()
    );
  };

  syncCustomersStorage = async () => {
    await addCustomers("customers", JSON.stringify(this.state.customers));
  };

  setSingleCustomer = async (id) => {
    let customer = this.state.customers.find((item) => item.id === id);
    await addCustomers("singleCustomer", JSON.stringify(customer));
    this.setState({
      singleCustomer: { ...customer },
    });
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
        filteredCustomers: tempCustomers,
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

  handleSearchChange = (event) => {
    const name = event.target.name;

    this.setState(
      {
        [name]: event.target.value,
      },
      this.sortData
    );
  };

  sortData = () => {
    const { customers, search } = this.state;

    //filtereing based on search
    if (search.length > 0) {
      const filteredCustomers = [...customers].filter(
        (item) => item.name.toLowerCase().indexOf(search.toLowerCase()) > -1
      );

      this.setState({
        filteredCustomers,
      });
    } else {
      this.setState({
        filteredCustomers: customers,
      });
    }
  };

  setLanguage = () => {
    const { language } = this.state;
    this.setState({ language: language == "en" ? "lt" : "en" });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          removeItem: this.removeItem,
          handleSidebar: this.handleSidebar,
          closeSidebar: this.closeSidebar,
          addNewProduct: this.addNewProduct,
          editItem: this.editItem,
          loadPage: this.loadPage,
          validateAddress: this.validateAddress,
          sortData: this.sortData,
          handleSearchChange: this.handleSearchChange,
          setSingleCustomer: this.setSingleCustomer,
          setLanguage: this.setLanguage,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductContext, ProductProvider, ProductConsumer };
