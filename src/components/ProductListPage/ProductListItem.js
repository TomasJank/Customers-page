import React, { useState } from "react";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";
// ==== Icons ====
import { FaTrash, FaEye, FaEdit } from "react-icons/fa";
// ==== Icons ====

const ProductListItem = ({
  customer,
  increment,
  decrement,
  removeItem,
  setSingleProduct,
  ...props
}) => {
  const { id, name, email, city, street, houseNumber, zip } = customer;

  const {
    intl: { formatMessage },
  } = props;

  return (
    <div className="row mt-5 mt-lg-0 text-capitalize text-center align-items-center">
      <div className="col-lg-10">
        <div className="row">
          <div className="col-12 col-lg-2">
            <span className="d-lg-none">
              {formatMessage({ id: "Full Name" })} :{" "}
            </span>
            {name}
          </div>

          <div className="col-12 col-lg-2">
            <span className="d-lg-none">
              {formatMessage({ id: "Email" })} :{" "}
            </span>
            {email}
          </div>

          <div className="col-12 col-lg-2">
            <span className="d-lg-none">
              {formatMessage({ id: "city" })} :{" "}
            </span>
            {city}
          </div>

          <div className="col-12 col-lg-2">
            <span className="d-lg-none">
              {formatMessage({ id: "street" })} :{" "}
            </span>
            {street}
          </div>

          <div className="col-12 col-lg-2">
            <span className="d-lg-none">
              {formatMessage({ id: "houseNumber" })} :{" "}
            </span>
            {houseNumber}
          </div>

          <div className="col-12 col-lg-2">
            <span className="d-lg-none">{formatMessage({ id: "zip" })} : </span>
            {zip}
          </div>
        </div>
      </div>
      <div className="col-lg-2">
        <div className="row">
          <div className="col-12">
            <Link to={`/products/${id}`}>
              <FaEye
                className="cart-icon mr-2"
                onClick={() => setSingleProduct(id)}
                size={20}
                title={formatMessage({ id: "viewProduct" })}
              />
            </Link>

            <Link to={`/products/${id}/edit`}>
              <FaEdit
                className="cart-icon mr-2"
                onClick={() => setSingleProduct(id)}
                size={20}
                title={formatMessage({ id: "editProduct" })}
              />
            </Link>
            <FaTrash
              className="text-danger cart-icon"
              onClick={() => removeItem(id)}
              size={20}
              title={formatMessage({ id: "deleteProduct" })}
            />
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default injectIntl(ProductListItem);
