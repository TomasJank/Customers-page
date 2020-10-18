import React from "react";
import { injectIntl } from "react-intl";
import styled from "styled-components";

// ==== Components ====
import CustomerListItem from "./CustomerListItem";
// ==== Components ====

const CustomerListItems = ({ filteredCustomers, removeItem, ...props }) => {
  const {
    intl: { formatMessage },
  } = props;
  return (
    <ProductListWrapper className="styled-scrollbar">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="my-2">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((item, index) => (
                  <CustomerListItem
                    key={index}
                    customer={item}
                    removeItem={removeItem}
                  ></CustomerListItem>
                ))
              ) : (
                <div className="col text-title text-center m-3">
                  {formatMessage({ id: "noMatch" })}{" "}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProductListWrapper>
  );
};

const ProductListWrapper = styled.footer`
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0px 10px;
`;

export default injectIntl(CustomerListItems);
