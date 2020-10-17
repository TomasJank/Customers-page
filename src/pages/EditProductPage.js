import React, { useState, useEffect, useRef } from "react";
import { injectIntl } from "react-intl";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { Input, Checkbox, Row, Form, Upload, Modal } from "antd";

// ==== Components ====
import Hero from "../components/Hero";
// ==== Components ====

// ==== Helpers ====
import { singleProductBcg, addUser } from "../helpers/images-helper";
// ==== Helpers ====

// ==== Context API ====
import { ProductConsumer } from "../context";
// ==== Context API ====

const EditProductPage = (props) => {
  const [redirect, setRedirect] = useState(false);

  const {
    intl: { formatMessage },
  } = props;

  const handleSubmit = (values, editItem, singleProduct) => {
    const id = singleProduct.id;
    editItem(values, id);
    setRedirect({ value: true, id });
  };

  if (redirect.value) {
    return <Redirect push to={{ pathname: `/customers-list` }} />;
  }

  return (
    <EditProductWrapper>
      <Hero
        img={singleProductBcg}
        title={formatMessage({ id: "editProduct" })}
      />
      <ProductConsumer>
        {(value) => {
          const { singleProduct, editItem } = value;
          const { name, email, city, street, houseNumber, zip } = singleProduct;

          return (
            <Form
              onFinish={(values) =>
                handleSubmit(values, editItem, singleProduct)
              }
              scrollToFirstError
              initialValues={{
                name,
                email,
                city,
                street,
                houseNumber,
                zip,
              }}
            >
              <section className="py-5">
                <div className="container">
                  <div className="row">
                    <div className="col-10 mx-auto col-sm-8 col-md-6 my-3 ">
                      <img src={addUser} height="250"/>
                    </div>
                    <div className="col-10 mx-auto col-sm-8 col-md-6 my-3 ">
                      <h5 className="mb-4 text-capitalize">
                        <div className="text-title">
                          {formatMessage({ id: "Name" })}:{""}
                        </div>
                        <span>
                          <Form.Item
                            name="name"
                            rules={[
                              {
                                required: true,
                                message: formatMessage({
                                  id: "fieldCannotBeEmpty",
                                }),
                              },
                            ]}
                          >
                            <Input maxLength={40} />
                          </Form.Item>
                        </span>
                      </h5>

                      <h5 className="text-capitalize mb-4">
                        <div className="text-title">
                          {formatMessage({ id: "email" })}:{" "}
                        </div>
                        <span>
                          <Form.Item
                            name="email"
                            rules={[
                              {
                                required: true,
                                message: formatMessage({
                                  id: "fieldCannotBeEmpty",
                                }),
                              },
                            ]}
                          >
                            <Input maxLength={40} />
                          </Form.Item>
                        </span>
                      </h5>

                      <h5 className="text-capitalize mb-4">
                        <div className="text-title">
                          {formatMessage({ id: "city" })}:{" "}
                        </div>
                        <span>
                          <Form.Item
                            name="city"
                            rules={[
                              {
                                required: true,
                                message: formatMessage({
                                  id: "fieldCannotBeEmpty",
                                }),
                              },
                            ]}
                          >
                            <Input maxLength={40} />
                          </Form.Item>
                        </span>
                      </h5>

                      <h5 className="text-capitalize mb-4">
                        <div className="text-title">
                          {formatMessage({ id: "street" })}:{" "}
                        </div>
                        <span>
                          <Form.Item
                            name="street"
                            rules={[
                              {
                                required: true,
                                message: formatMessage({
                                  id: "fieldCannotBeEmpty",
                                }),
                              },
                            ]}
                          >
                            <Input maxLength={40} />
                          </Form.Item>
                        </span>
                      </h5>

                      <h5 className="text-capitalize mb-4">
                        <div className="text-title">
                          {formatMessage({ id: "houseNumber" })}:{" "}
                        </div>
                        <span>
                          <Form.Item
                            name="houseNumber"
                            rules={[
                              {
                                required: true,
                                message: formatMessage({
                                  id: "fieldCannotBeEmpty",
                                }),
                              },
                            ]}
                          >
                            <Input maxLength={40} />
                          </Form.Item>
                        </span>
                      </h5>

                      <h5 className="text-capitalize mb-4">
                        <div className="text-title">
                          {formatMessage({ id: "zip" })}:{" "}
                        </div>
                        <span>
                          <Form.Item
                            name="zip"
                            rules={[
                              {
                                required: true,
                                message: formatMessage({
                                  id: "fieldCannotBeEmpty",
                                }),
                              },
                            ]}
                          >
                            <Input maxLength={40} />
                          </Form.Item>
                        </span>
                      </h5>

                      <button
                        // type="button"
                        htmltype="submit"
                        className="main-link"
                        style={{ margin: "0.75rem" }}
                      >
                        {formatMessage({ id: "saveChanges" })}{" "}
                      </button>
                      <Link
                        to={`/customers-list`}
                        className="main-link"
                        style={{ margin: "0.75rem" }}
                      >
                        {formatMessage({ id: "goBack" })}{" "}
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            </Form>
          );
        }}
      </ProductConsumer>
    </EditProductWrapper>
  );
};
// ==== ANTD customization ====

const EditProductWrapper = styled.div`
  .ant-upload.ant-upload-select-picture-card {
    position: absolute;
    z-index: 2;
  }

  .ant-upload-list-picture-card .ant-upload-list-item {
    width: 500px;
    height: 500px;
  }
`;
// ==== ANTD customization ====

export default injectIntl(EditProductPage);
