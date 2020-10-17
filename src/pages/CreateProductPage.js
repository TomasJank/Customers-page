import React, { useState, useEffect, useRef } from "react";
import { injectIntl } from "react-intl";
import styled from "styled-components";
import { Input, Checkbox, Row, Form, Upload, Modal, message } from "antd";
import { Link, Redirect } from "react-router-dom";

// ==== Components ====
import Hero from "../components/Hero";
// ==== Components ====

// ==== Helpers ====
import { singleProductBcg, addUser } from "../helpers/images-helper";
// ==== Helpers ====

// ==== Context API ====
import { ProductConsumer } from "../context";
// ==== Context API ====

const CreateProductPage = (props) => {
  const [form] = Form.useForm();

  // const { getFieldDecorator, getFieldValue } = props.form;
  const [redirect, setRedirect] = useState(false);

  const {
    intl: { formatMessage },
  } = props;


  const onAddressNotFound =()=>{
    message.warning(
      "The address cannot be found, please type in a valid address"
    );
    form.setFields([
      {
        name: "city",
        errors: ["City name might be invalid"],
      },
      {
        name: "street",
        errors: ["Street name might be invalid"],
      },
      {
        name: "houseNumber",
        errors: ["House number might be invalid"],
      },
      {
        name: "zip",
        errors: ["Zip code might be invalid"],
      },
    ]);
  }

  const handleSubmit = async (values, addNewProduct, validateAddress) => {
    console.log("new values are", values);
    const { city, street, houseNumber, zip } = values;

    if(await validateAddress(`${city}, ${street}, ${houseNumber}, ${zip}`)){
    // if (false) {
      console.log("its true");
      addNewProduct(values);
      setRedirect(true);
    } else {
      console.log("invalid address", props, form);
      onAddressNotFound();
    }
  };

  // const onAddressValidator = async() =>{

  //   if (!validAddress) {
  //     throw new Error("bad email format");
  //   }
  // }

  if (redirect) {
    return <Redirect push to={{ pathname: "/customers-list" }} />;
  }

  return (
    <div>
      <Hero
        img={singleProductBcg}
        title={formatMessage({ id: "creteProduct" })}
      />
      <ProductConsumer>
        {(value) => {
          const { addNewProduct, validateAddress, loadPage } = value;
          return (
            <StyledForm
              form={form}
              onFinish={(values) =>
                handleSubmit(values, addNewProduct, validateAddress)
              }
              scrollToFirstError
              initialValues={{
                featured: false,
                freeShipping: false,
                active: false,
              }}
            >
              <section className="py-5">
                <div className="container">
                  <div className="row">
                    <div className="col-10 mx-auto col-sm-8 col-md-6 my-3 ">
                      <img src={addUser} />
                    </div>
                    <div className="col-10 mx-auto col-sm-8 col-md-6 my-3 ">
                      <h5 className="mb-4 text-capitalize">
                        <div className="text-title">
                          {formatMessage({ id: "Name" })}:{" "}
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
                                // validator:onAddressValidator
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
                                // validator:onAddressValidator
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
                                // validator:onAddressValidator
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
                                // validator:onAddressValidator
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
            </StyledForm>
          );
        }}
      </ProductConsumer>
    </div>
  );
};

// ==== ANTD customization ====

const StyledForm = styled(Form)`
  @media only screen and (min-width: 320px) and (max-width: 991px) {
    .ant-upload.ant-upload-select-picture-card {
      width: 100%;
      height: 300px;
    }

    .ant-upload-list-picture-card .ant-upload-list-item {
      width: 280px;
      height: 300px;
    }
    .ant-upload-picture-card-wrapper {
      height: 300px;
    }
  }
  @media only screen and (min-width: 991px) {
    .ant-upload.ant-upload-select-picture-card {
      width: 500px;
      height: 500px;
    }

    .ant-upload-list-picture-card .ant-upload-list-item {
      width: 500px;
      height: 500px;
    }
  }
`;
// ==== ANTD customization ====

export default injectIntl(CreateProductPage);
