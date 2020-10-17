import React from "react";
import { Link } from "react-router-dom";
import { injectIntl } from "react-intl";

// ==== Components ====
import Title from "../Title";
import CustomerListFilter from "./CustomerListFilter";
import CustomerListColumns from "./CustomerListColumns";
import CustomerListItems from "./CustomerListItems";
// ==== Components ====

const CustomerList = (props) => {
  const {
    intl: { formatMessage },
  } = props;

  return (
    <section>
      <div className="container mt-5">
        <Title title={formatMessage({ id: "customersList" })} center />
      </div>
      <CustomerListFilter />
      <CustomerListColumns />
      <CustomerListItems />
      <div className="col text-center my-4">
        <Link to="/customer/new" >
          <button className="main-link mb-4">
              {formatMessage({ id: "addNewCustomer" })}
          </button>
        </Link>
      </div>
    </section>
  );
};

export default injectIntl(CustomerList);
