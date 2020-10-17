import React, { Component } from "react";
import { linkData } from "./linkData";
import { socialData } from "./socialData";
import { items } from "./customerData";
import keys from "../config/keys";

import Geocode from "react-geocode";

Geocode.setApiKey(keys.googleMapApi);

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    sidebarOpen: false,
    links: linkData,
    socialIcons: socialData,
    customers: [],
    search: "",
    filteredCustomers: [],
    singleCustomer: "",
    loading: false,
  };

  componentWillMount() {
    !localStorage.getItem("customers")
      ? this.setCustomers(items)
      : this.setFeatures();
  }

  componentDidMount() {
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

  setFeatures() {
    const customers = JSON.parse(localStorage.getItem("customers"));
    this.setState({
      customers,
      filteredCustomers: customers,
    });
  }

  setCustomers = (products) => {
    let customers = products.map((item) => {
      const id = item.id;
      const name = item.name;
      const email = item.email;
      const city = item.city;
      const street = item.street;
      const houseNumber = item.houseNumber;
      const zip = item.zip;
      const products = { id, name, email, city, street, houseNumber, zip };
      return products;
    });

    localStorage.setItem("customers", JSON.stringify(customers));

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
      id: customers.length,
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

  getStorageCustomer = () => {
    return localStorage.getItem("singleCustomer")
      ? JSON.parse(localStorage.getItem("singleCustomer"))
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

  syncCustomersStorage = () => {
    localStorage.setItem("customers", JSON.stringify(this.state.customers));
  };

  setSingleCustomer = (id) => {
    let customer = this.state.customers.find((item) => item.id === id);
    localStorage.setItem("singleCustomer", JSON.stringify(customer));
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
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
