import React from "react";
import { Link } from "react-router-dom";
import { injectIntl } from "react-intl";

// ==== Components ====
import Hero from "../components/Hero";
import Info from "../components/HomePage/Info";
// ==== Components ====

const HomePage = (props) => {
  const {
    intl: { formatMessage },
  } = props;


  return (
    <div>
      <Hero title={formatMessage({ id: "welcome" })} max="true">
        <Link
          to="/customers-list"
          className="main-link"
          style={{ margin: "2rem" }}
        >
          {formatMessage({ id: "yourCustomers" })}
        </Link>

        <Link
          to="/customer/new"
          className="main-link"
          style={{ margin: "2rem" }}
        >
          {formatMessage({ id: "addNewCustomer" })}
        </Link>
      </Hero>
      <Info />
    </div>
  );
};

export default injectIntl(HomePage);
