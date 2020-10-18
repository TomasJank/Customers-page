import React from "react";

// ==== Components ====
import CustomerList from "../components/CustomerListPage/CustomerList";
import Hero from "../components/Hero";
// ==== Components ====

// ==== Helpers ====
import { storeBcg } from "../assets/image-assets";
// ==== Helpers ====

const CustomerListPage = () => {
  return (
    <div>
      <Hero img={storeBcg} />
      <CustomerList />
    </div>
  );
};

export default CustomerListPage;
