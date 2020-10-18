import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { injectIntl } from "react-intl";

// ==== Components ====
import Title from "../Title";
import CustomerListFilter from "./CustomerListFilter";
import CustomerListColumns from "./CustomerListColumns";
import CustomerListItems from "./CustomerListItems";
// ==== Components ====

// ==== Context API ====
import { ProductContext } from "../../context/context";
// ==== Context API ====

const CustomerList = (props) => {
  const isInitialMount = useRef(true);

  const { customers, loadPage, removeItem } = useContext(ProductContext);
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  const {
    intl: { formatMessage },
  } = props;

  useEffect(() => {
    loadPage(true);

    if (isInitialMount.current && !customers.length) {
      isInitialMount.current = false;
    } else if (!isInitialMount.current || customers.length > 0) {
      setFilteredCustomers(customers);
      loadPage(false);
    }
  }, [customers, loadPage]);

  return (
    <section>
      <div className="container mt-5">
        <Title title={formatMessage({ id: "customersList" })} center />
      </div>
      <CustomerListFilter
        customers={customers}
        onFilteredCustomersChange={setFilteredCustomers}
      />
      <CustomerListColumns />
      <CustomerListItems filteredCustomers={filteredCustomers} removeItem={removeItem}/>
      <div className="col text-center my-4">
        <Link to="/customer/new">
          <button className="main-link mb-4">
            {formatMessage({ id: "addNewCustomer" })}
          </button>
        </Link>
      </div>
    </section>
  );
};

export default injectIntl(CustomerList);
