import React from "react";
import { Link } from "react-router-dom";
import { injectIntl } from "react-intl";
// ==== Icons ====
import { FaPlusCircle } from "react-icons/fa";
// ==== Icons ====

// ==== Components ====
import Title from "../Title";
import ProductListColumns from "./ProductListColumns";
import ProductListItems from "./ProductListItems";
// ==== Components ====

const ProductList = (props) => {
  const {
    intl: { formatMessage },
  } = props;

  return (
    <section>
      <div className="container mt-5">
        <Title title={formatMessage({ id: "customersList" })} center />
      </div>
      <ProductListColumns />
      <ProductListItems />
      <div className="col text-title text-center my-4">
        <Link to="/customers/new">
          <button className="btn btn-outline-primary text-capitalize mb-4">
            <span className="d-flex align-items-center">
              {" "}
              {formatMessage({ id: "addNewProduct" })}
              <FaPlusCircle className="ml-2" />
            </span>
          </button>
        </Link>
      </div>
    </section>
  );
};

export default injectIntl(ProductList);
