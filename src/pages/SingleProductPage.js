import React from "react";
import { Link } from "react-router-dom";
import { injectIntl } from "react-intl";

// ==== Components ====
import Hero from "../components/Hero";
// ==== Components ====

// ==== Helpers ====
import { singleProductBcg, addUser } from "../helpers/images-helper";
// ==== Helpers ====

// ==== Context API ====
import { ProductConsumer } from "../context";
// ==== Context API ====

const SingleProductPage = (props) => {
  return (
    <div>
      <Hero img={singleProductBcg} title="single product" />
      <ProductConsumer>
        {(value) => {
          const { singleProduct } = value;

          const { name, email, city, houseNumber, zip } = singleProduct;

          const {
            intl: { formatMessage },
          } = props;

          return (
            <section className="py-5">
              <div className="container">
                <div className="row">
                  <div className="col-10 mx-auto col-sm-8 col-md-6 my-3 text-center">
                    <img
                      src={addUser}
                      width="500"
                      height="500"
                      alt="single product"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-10 mx-auto col-sm-8 col-md-6 my-3 ">
                    <h5 className="text-title mb-4">
                      {formatMessage({ id: "name" })}: {name}
                    </h5>
                    <h5 className="text-capitalize text-muted mb-4">
                      {formatMessage({ id: "email" })}: {email}
                    </h5>

                    <h5 className="text-main text-capitalize mb-4">
                      {formatMessage({ id: "city" })}: {city}
                    </h5>
                    <h5 className="text-main text-capitalize mb-4">
                      {formatMessage({ id: "houseNumber" })}: {houseNumber}
                    </h5>

                    <h5 className="text-main text-capitalize mb-4">
                      {formatMessage({ id: "zip" })}: {zip}
                    </h5>

                    <Link to="/products" className="main-link">
                      {formatMessage({ id: "backToProducts" })}{" "}
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

export default injectIntl(SingleProductPage);
