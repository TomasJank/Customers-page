import React, { useEffect, useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { useRouter } from "../hooks/useRouter";
import { injectIntl } from "react-intl";

// ==== Components ====
import Hero from "../components/Hero";
// ==== Components ====

// ==== Helpers ====
import { customerBcg } from "../assets/image-assets";
// ==== Helpers ====

// ==== Context API ====
import { ProductContext } from "../context/context";
// ==== Context API ====

const SingleCustomerPage = (props) => {

  const isInitialMount = useRef(true);

  const { customers, loadPage } = useContext(ProductContext);

  const [customer, setCustomer] = useState(null);

  const {
    intl: { formatMessage },
  } = props;

  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    loadPage(true);
    if (isInitialMount.current && !customers.length) {

      isInitialMount.current = false;
    } else if (!isInitialMount.current || customers.length > 0) {

      const c = customers.filter((c) => c.id === parseInt(id))[0];
      if (!c) return window.location.href = "/";;
      loadPage(false);

      setCustomer(c);
    }
  }, [customers, id, loadPage]);

  if (!customer) return null; // Could add something more entertaining than a null LOL ...

  const { name, email, city, street, houseNumber, zip } = customer;

  return (
    <div>
      <Hero img={customerBcg} />
      <section>
        <div className="container">
          <div className="d-flex justify-content-center">
            <div className="col-10 mx-auto col-sm-8 col-md-6 text-center my-5">
              <h5 className="mb-4 text-capitalize">
                <div className="col text-title text-center mb-5">
                  {" "}
                  {formatMessage({ id: "customerInformation" })}
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
    </div>
  );
};

export default injectIntl(SingleCustomerPage);
