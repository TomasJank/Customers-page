import React from "react";
import { injectIntl } from "react-intl";

const ProductListColumns = (props) => {
  const {
    intl: { formatMessage },
  } = props;
  return (
    <div className="container-fluid text-center d-none d-lg-block mt-5">
      <div className="row">
        <div className="col-lg-10">
          <div className="row">
            <div className="col-lg-2">
              <p className="text-uppercase font-weight-bold">
                {formatMessage({ id: "Full Name" })}
              </p>
            </div>

            <div className="col-lg-2">
              <p className="text-uppercase font-weight-bold">
                {formatMessage({ id: "Email" })}
              </p>
            </div>

            <div className="col-lg-2">
              <p className="text-uppercase font-weight-bold">
                {formatMessage({ id: "city" })}
              </p>
            </div>
            <div className="col-lg-2">
              <p className="text-uppercase font-weight-bold">
                {formatMessage({ id: "street" })}
              </p>
            </div>
            <div className="col-lg-2">
              <p className="text-uppercase font-weight-bold">
                {formatMessage({ id: "houseNumber" })}
              </p>
            </div>
            <div className="col-lg-2">
              <p className="text-uppercase font-weight-bold">
                {formatMessage({ id: "zip" })}
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-2">
          <p className="text-uppercase font-weight-bold">
            {formatMessage({ id: "controls" })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(ProductListColumns);
