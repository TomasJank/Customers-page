import React, { useState, useEffect } from "react";
import { injectIntl } from "react-intl";
import { Input } from "antd";

// ==== Icons ====
import { FaSearch } from "react-icons/fa";
// ==== Icons ====

// ==== Context API ====
import { ProductConsumer } from "../../context/context";
// ==== Context API ====

const CustomerListFilter = ({
  customer,
  onFilteredCustomersChange,
  ...props
}) => {
  const [searchValue, setSearchValue] = useState("");

  const {
    intl: { formatMessage },
  } = props;

  useEffect(() => {

    const sortData = () => {
      const { customers } = props;
  
      //filtereing based on search
      if (searchValue.length > 0) {
        const filteredCustomers = [...customers].filter(
          (item) =>
            item.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
        );
  
        onFilteredCustomersChange(filteredCustomers);
      } else {
        onFilteredCustomersChange(customers);
      }
    };

    sortData();

  }, [searchValue]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };



  return (
    <ProductConsumer>
      {(value) => {
        return (
          <div className="d-flex justify-content-center my-3 my-md-5 my-sm-3">
            <Input
              // className="ant-input"
              prefix={<FaSearch className="mr-2" />}
              style={{ width: "300px" }}
              value={searchValue}
              type="text"
              name="search"
              onChange={handleSearchChange}
              placeholder={formatMessage({ id: "searchByFullName" })}
              autoComplete="off"
            />
          </div>
        );
      }}
    </ProductConsumer>
  );
};

export default injectIntl(CustomerListFilter);
