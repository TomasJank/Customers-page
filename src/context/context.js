import React, { Component } from "react";
import { linkData } from "./linkData";
import { socialData } from "./socialData";
import { items } from "./productData";
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
    filteredProducts: [],
    singleProducts: {},
    loading: false,
  };

  componentWillMount() {
    !localStorage.getItem("customers")
      ? this.setProducts(items)
      : this.setFeatures();
  }

  componentDidMount() {
    window.addEventListener("click", this.clickHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.clickHandler);
  }

  clickHandler = (e) => {
    if (e.target.nodeName === "path"|| e.target.nodeName === "svg") return;
    this.closeSidebar()
  };

  setFeatures() {
    const customers = JSON.parse(localStorage.getItem("customers"));
    const maxPrice = Math.max(...customers.map((item) => item.price));
    const featuredProducts = customers.filter((item) => item.featured === true);
    this.setState({
      customers,
      filteredProducts: customers,
      featuredProducts,
      singleProduct: this.getStorageProduct(),
      max: maxPrice,
      price: maxPrice,
    });
  }

  setProducts = (products) => {
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
      filteredProducts: customers,
      singleProduct: this.getStorageProduct(),
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

    let featuredProducts = newcustomers.filter(
      (item) => item.featured === true
    );
    //get max price
    let maxPrice = Math.max(...newcustomers.map((item) => item.price));

    this.setState(
      {
        customers: newcustomers,
        filteredProducts: newcustomers,
        featuredProducts,
        singleProduct: this.getStorageProduct(),
        max: maxPrice,
        price: maxPrice,
      },
      () => this.syncProductsStorage()
    );
  };

  // get product from local storage
  getStorageProduct = () => {
    return localStorage.getItem("singleProduct")
      ? JSON.parse(localStorage.getItem("singleProduct"))
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

    let featuredProducts = newcustomers.filter(
      (item) => item.featured === true
    );
    //get max price
    let maxPrice = Math.max(...newcustomers.map((item) => item.price));

    this.setState(
      {
        customers: newcustomers,
        filteredProducts: newcustomers,
        featuredProducts,
        max: maxPrice,
        price: maxPrice,
      },
      () => this.syncProductsStorage()
    );
  };

  syncProductsStorage = () => {
    localStorage.setItem("customers", JSON.stringify(this.state.customers));
  };

  //set single product
  setSingleProduct = (id) => {
    let product = this.state.customers.find((item) => item.id === id);
    localStorage.setItem("singleProduct", JSON.stringify(product));
    this.setState({
      singleProduct: { ...product },
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
    let tempProducts = [...this.state.customers];
    tempProducts = tempProducts.filter((item) => item.id !== id);

    let featuredProducts = tempProducts.filter(
      (item) => item.featured === true
    );
    //get max price
    let maxPrice = Math.max(...tempProducts.map((item) => item.price));

    this.setState(
      {
        customers: tempProducts,
        filteredProducts: tempProducts,
        featuredProducts,
        max: maxPrice,
        price: maxPrice,
      },
      () => {
        this.syncProductsStorage();
      }
    );
    return tempProducts;
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

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          removeItem: this.removeItem,
          handleSidebar: this.handleSidebar,
          closeSidebar: this.closeSidebar,
          setSingleProduct: this.setSingleProduct,
          addNewProduct: this.addNewProduct,
          editItem: this.editItem,
          loadPage: this.loadPage,
          validateAddress: this.validateAddress,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
