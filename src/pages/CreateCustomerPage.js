import React, { useState } from "react";
import { injectIntl } from "react-intl";
import styled from "styled-components";
import { Input, Form, message } from "antd";
import { Link, Redirect } from "react-router-dom";

// ==== Icons ====
import { AiFillMail, AiOutlineUser } from "react-icons/ai";
import { FaCity, FaStreetView, FaMapMarkerAlt } from "react-icons/fa";
import { BsFillHouseDoorFill } from "react-icons/bs";
// ==== Icons ====

// ==== Components ====
import Hero from "../components/Hero";
// ==== Components ====

// ==== Helpers ====
import { customerBcg } from "../helpers/images-helper";
// ==== Helpers ====

// ==== Context API ====
import { ProductConsumer } from "../context/context";
// ==== Context API ====

const CreateCustomerPage = (props) => {
  const [form] = Form.useForm();

  const [redirect, setRedirect] = useState(false);

  const {
    intl: { formatMessage },
  } = props;

  const onAddressNotFound = () => {
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
  };

  const emailValidator = async (_, value) => {
    const emailRegexTest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      value
    );

    if (!value) {
      throw new Error("fieldCannotBeEmpty");
    } else if (!emailRegexTest) {
      throw new Error("Invalid email format");
    }
  };

  const handleSubmit = async (values, addNewProduct, validateAddress) => {
    const { city, street, houseNumber, zip } = values;

    if (await validateAddress(`${city}, ${street}, ${houseNumber}, ${zip}`)) {
      addNewProduct(values);
      setRedirect(true);
    } else {
      onAddressNotFound();
    }
  };

  if (redirect) {
    return <Redirect push to={{ pathname: "/customers-list" }} />;
  }

  return (
    <div>
      <Hero img={customerBcg} />
      <ProductConsumer>
        {(value) => {
          const { addNewProduct, validateAddress } = value;
          return (
            <StyledForm
              form={form}
              onFinish={(values) =>
                handleSubmit(values, addNewProduct, validateAddress)
              }
              scrollToFirstError
            >
              <section>
                <div className="container">
                  <div className="d-flex justify-content-center">
                    <div className="col-10 mx-auto col-sm-8 col-md-6 my-5">
                      <h5 className="mb-4 text-capitalize">
                        <div className="col text-title text-center mb-5">
                          {" "}
                          Register a new customer
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
                            <Input
                              prefix={<AiOutlineUser className="mr-2" />}
                              maxLength={40}
                              placeholder="Full Name"
                            />
                          </Form.Item>
                        </span>
                      </h5>

                      <h5 className="text-capitalize mb-4">
                        <span>
                          <Form.Item
                            name="email"
                            rules={[
                              {
                                required: true,

                                validator: emailValidator,
                              },
                            ]}
                          >
                            <Input
                              prefix={<AiFillMail className="mr-2" />}
                              maxLength={40}
                              placeholder="Email address"
                            />
                          </Form.Item>
                        </span>
                      </h5>

                      <h5 className="text-capitalize mb-4">
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
                            <Input
                              prefix={<FaCity className="mr-2" />}
                              maxLength={40}
                              placeholder="City"
                            />
                          </Form.Item>
                        </span>
                      </h5>

                      <h5 className="text-capitalize mb-4">
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
                            <Input
                              prefix={<FaStreetView className="mr-2" />}
                              maxLength={40}
                              placeholder="Street"
                            />
                          </Form.Item>
                        </span>
                      </h5>

                      <h5 className="text-capitalize mb-4">
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
                            <Input
                              prefix={<BsFillHouseDoorFill className="mr-2" />}
                              maxLength={40}
                              placeholder="House Number"
                            />
                          </Form.Item>
                        </span>
                      </h5>

                      <h5 className="text-capitalize mb-4">
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
                            <Input
                              prefix={<FaMapMarkerAlt className="mr-2" />}
                              maxLength={40}
                              placeholder="Zip code"
                            />
                          </Form.Item>
                        </span>
                      </h5>
                      <div className="d-flex flex-wrap justify-content-center">
                        <button
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
                          {formatMessage({ id: "backToCustomers" })}{" "}
                        </Link>
                      </div>
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

const StyledForm = styled(Form)`
  background: var(--mainGrey);
`;

export default injectIntl(CreateCustomerPage);
