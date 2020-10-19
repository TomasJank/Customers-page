import React from "react";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";
// ==== Icons ====
import { FaTrash, FaEye, FaEdit } from "react-icons/fa";
// ==== Icons ====

const CustomerListItem = ({
  customer,
  removeItem,
  key,
  ...props
}) => {
  const { id, name, email, city, street, houseNumber, zip } = customer;
  const {
    intl: { formatMessage },
  } = props;

  return (
    <div
      className="row text-capitalize text-center align-items-center mt-1 mb-4 mb-md-2 mb-sm-4"
      key={key}
    >
      <div className="col-lg-10">
        <div className="row">
          <div className="col-12 col-lg-2 text-break">
            <Link to={`/customer/${id}`}>
              <span className="d-lg-none">
                {formatMessage({ id: "fullName" })} :{" "}
              </span>
              <span> {name}</span>
            </Link>
          </div>

          <div className="col-12 col-lg-2 text-break" style={{textTransform:"none"}}>
            <span className="d-lg-none">
              {formatMessage({ id: "email" })} :{" "}
            </span>
            {email}
          </div>

          <div className="col-12 col-lg-2 text-break">
            <span className="d-lg-none">
              {formatMessage({ id: "city" })} :{" "}
            </span>
            {city}
          </div>

          <div className="col-12 col-lg-2 text-break">
            <span className="d-lg-none">
              {formatMessage({ id: "street" })} :{" "}
            </span>
            {street}
          </div>

          <div className="col-12 col-lg-2 text-break">
            <span className="d-lg-none">
              {formatMessage({ id: "houseNumber" })} :{" "}
            </span>
            {houseNumber}
          </div>

          <div className="col-12 col-lg-2 text-break">
            <span className="d-lg-none">{formatMessage({ id: "zip" })} : </span>
            {zip}
          </div>
        </div>
      </div>
      <div className="col-lg-2">
        <div className="row">
          <div className="col-12">
            <Link to={`/customer/${id}`}>
              <FaEye
                className="mr-2"
                size={20}
                title={formatMessage({ id: "viewCustomer" })}
              />
            </Link>

            <Link to={`/customer/${id}/edit`}>
              <FaEdit
                className="mr-2"
                size={20}
                title={formatMessage({ id: "editCustomer" })}
              />
            </Link>
            <FaTrash
              className="text-danger cart-icon"
              style={{ cursor: "pointer" }}
              onClick={() => removeItem(id)}
              size={20}
              title={formatMessage({ id: "deleteCustomer" })}
            />
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default injectIntl(CustomerListItem);
