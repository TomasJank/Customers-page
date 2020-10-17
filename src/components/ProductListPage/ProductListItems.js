import React from "react";
// ==== Components ====
import ProductListItem from "./ProductListItem";
// ==== Components ====

// ==== Context API ====
import { ProductConsumer } from "../../context/context";
// ==== Context API ====

const ProductListItems = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <ProductConsumer>
            {(value) => {
              const {
                increment,
                decrement,
                removeItem,
                customers,
                setSingleProduct,
                setActive,
                setEditPrice,
              } = value;
         
              return (
                <div>
                  {customers.map((item) => (
                    <ProductListItem
                      key={item.id}
                      customer={item}
                      increment={increment}
                      decrement={decrement}
                      removeItem={removeItem}
                      setSingleProduct={setSingleProduct}
                      setActive={setActive}
                      setEditPrice={setEditPrice}
                    ></ProductListItem>
                  ))}
                </div>
              );
            }}
          </ProductConsumer>
        </div>
      </div>
    </div>
  );
};

export default ProductListItems;
