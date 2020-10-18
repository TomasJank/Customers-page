import React from "react";
import { injectIntl } from "react-intl";
import {Input} from "antd";

// ==== Icons ====
import { FaSearch } from "react-icons/fa";
// ==== Icons ====

// ==== Context API ====
import { ProductConsumer } from "../../context/context";
// ==== Context API ====

const CustomerListFilter = (props) => {
  const {
    intl: { formatMessage },
  } = props;
  return (
    <ProductConsumer>
      {(value) => {
        const { handleSearchChange, search } = value;
        return (
        
            <div className="d-flex justify-content-center my-3 my-md-5 my-sm-3">
              <Input
                // className="ant-input"
                prefix={<FaSearch className="mr-2"/>}
                style={{ width: "300px" }}
                value={search}
                type="text"
                name="search"
                onChange={handleSearchChange}
                placeholder={formatMessage({id: "searchByFullName"})}
                autoComplete="off"
              />
          </div>
        );
      }}
    </ProductConsumer>
  );
};

export default injectIntl(CustomerListFilter);
