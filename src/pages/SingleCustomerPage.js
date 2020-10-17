import React from "react";
import { Link } from "react-router-dom";
import { injectIntl } from "react-intl";

// ==== Components ====
import Hero from "../components/Hero";
// ==== Components ====

// ==== Helpers ====
import { customerBcg } from "../helpers/images-helper";
// ==== Helpers ====

// ==== Context API ====
import { ProductConsumer } from "../context/context";
// ==== Context API ====

const SingleCustomerPage = (props) => {
  return (
    <div>
      <Hero img={customerBcg} />
      <ProductConsumer>
        {(value) => {
          const { singleCustomer, customers } = value;
          const id = parseInt(props.location.pathname.split("/")[2]);
          let selectedCustomer = singleCustomer
            ? singleCustomer
            : customers.filter((customer) => customer.id === id)[0];

          if (!selectedCustomer) window.location.href = "/";

          const {
            name,
            email,
            city,
            street,
            houseNumber,
            zip,
          } = selectedCustomer;

          const {
            intl: { formatMessage },
          } = props;

          return (
            <section>
              <div className="container">
                <div className="d-flex justify-content-center">
                  <div className="col-10 mx-auto col-sm-8 col-md-6 text-center my-5">
                    <h5 className="mb-4 text-capitalize">
                      <div className="col text-title text-center mb-5">
                        {" "}
                        Customer information
                      </div>
                    </h5>
                    <h5 className="text-muted text-capitalize mb-4">
                      {formatMessage({ id: "name" })}: {name}
                    </h5>
                    <h5 className="text-capitalize text-muted mb-4">
                      {formatMessage({ id: "email" })}: {email}
                    </h5>

                    <h5 className="text-muted text-capitalize mb-4">
                      {formatMessage({ id: "city" })}: {city}
                    </h5>
                    <h5 className="text-muted text-capitalize mb-4">
                      {formatMessage({ id: "street" })}: {street}
                    </h5>
                    <h5 className="text-muted text-capitalize mb-4">
                      {formatMessage({ id: "houseNumber" })}: {houseNumber}
                    </h5>

                    <h5 className="text-muted text-capitalize mb-4">
                      {formatMessage({ id: "zip" })}: {zip}
                    </h5>

                    <Link to="/customers-list" className="main-link">
                      {formatMessage({ id: "backToCustomers" })}{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          );
        }}
      </ProductConsumer>
    </div>
  );
};

export default injectIntl(SingleCustomerPage);
