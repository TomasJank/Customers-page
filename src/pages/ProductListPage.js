import React from "react";

// ==== Components ====
import ProductList from "../components/ProductListPage/ProductList";
import Hero from "../components/Hero";
// ==== Components ====

// ==== Helpers ====
import { storeBcg } from "../helpers/images-helper";
// ==== Helpers ====

const ProductListPage = () => {
  return (
    <div>
      <Hero img={storeBcg} />
      <ProductList />
    </div>
  );
};

export default ProductListPage;
