import React from "react";

// ==== Components ====
import CustomerList from "../components/CustomerListPage/CustomerList";
import Hero from "../components/Hero";
// ==== Components ====

// ==== Helpers ====
import { storeBcg } from "../helpers/images-helper";
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
