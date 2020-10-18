import React, { useEffect, useState, useContext, useRef } from "react";
import { useRouter } from "../hooks/useRouter";
import { injectIntl } from "react-intl";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { Input, Form, message } from "antd";

// ==== Icons ====
import { AiFillMail, AiOutlineUser } from "react-icons/ai";
import { FaCity, FaStreetView, FaMapMarkerAlt } from "react-icons/fa";
import { BsFillHouseDoorFill } from "react-icons/bs";
// ==== Icons ====

// ==== Components ====
import Hero from "../components/Hero";
// ==== Components ====

// ==== Helpers ====
import { customerBcg } from "../assets/image-assets";
// ==== Helpers ====

// ==== Context API ====
import { ProductContext } from "../context/context";
// ==== Context API ====

const EditCustomerPage = (props) => {
  const [form] = Form.useForm();

  const isInitialMount = useRef(true);

  const { customers, loadPage, editItem, validateAddress } = useContext(
    ProductContext
  );

  const [redirect, setRedirect] = useState(false);

  const [customer, setCustomer] = useState(null);

  const {
    intl: { formatMessage },
  } = props;

  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    loadPage(true);

    if (isInitialMount.current && !customers.length) {
      isInitialMount.current = false;
    } else if (!isInitialMount.current || customers.length > 0) {
      const c = customers.filter((c) => c.id === parseInt(id))[0];
      if (!c) return (window.location.href = "/");
      loadPage(false);

      setCustomer(c);
    }
  }, [customers, id, loadPage]);

  const onAddressNotFound = () => {
    message.warning(formatMessage({ id: "addressNotFound" }));
    form.setFields([
      {
        name: "city",
        errors: [
          formatMessage({
            id: "invalidCity",
          }),
        ],
      },
      {
        name: "street",
        errors: [
          formatMessage({
            id: "invalidStreet",
          }),
        ],
      },
      {
        name: "houseNumber",
        errors: [
          formatMessage({
            id: "invalidHouseNumber",
          }),
        ],
      },
      {
        name: "zip",
        errors: [
          formatMessage({
            id: "invalidZip",
          }),
        ],
      },
    ]);
  };

  const emailValidator = async (_, value) => {
    const emailRegexTest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      value
    );

    if (!value) {
      throw new Error(formatMessage({ id: "fieldCannotBeEmpty" }));
    } else if (!emailRegexTest) {
      throw new Error(formatMessage({ id: "invalidEmailFormat" }));
    }
  };

  const handleSubmit = async (
    values,
    editItem,
    singleCustomer,
    validateAddress
  ) => {
    const id = singleCustomer.id;

    const { city, street, houseNumber, zip } = values;

    if (await validateAddress(`${city}, ${street}, ${houseNumber}, ${zip}`)) {
      editItem(values, id);
      setRedirect({ value: true, id });
    } else {
      onAddressNotFound();
    }
  };

  if (!customer) return null; // Could add something more entertaining than a null LOL ...

  if (redirect.value) {
    return <Redirect push to={{ pathname: `/customers-list` }} />;
  }

  const { name, email, city, street, houseNumber, zip } = customer;

  return (
    <EditCustomerWrapper>
      <Hero img={customerBcg} />

      <Form
        form={form}
        onFinish={(values) =>
          handleSubmit(values, editItem, customer, validateAddress)
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
        <section>
          <div className="container">
            <div className="d-flex justify-content-center">
              <div className="col-10 mx-auto col-sm-8 col-md-6 my-5">
                <h5 className="mb-4 text-capitalize">
                  <div className="col text-title text-center mb-5">
                    {formatMessage({ id: "editCustomer" })}
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
      </Form>
    </EditCustomerWrapper>
  );
};

const EditCustomerWrapper = styled.div``;

export default injectIntl(EditCustomerPage);
