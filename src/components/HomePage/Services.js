import React, { Component } from "react";
import styled from "styled-components";
import { injectIntl } from "react-intl";
// ==== Icons ====
import { FaDolly, FaRedo, FaDollarSign } from "react-icons/fa";
// ==== Icons ====
class Services extends Component {
    
  state = {
    services: [
      {
        id: 1,
        icons: <FaDolly />,
        title: this.props.intl.formatMessage({id: "freeShipping"}),
        text:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, similique!",
      },
      {
        id: 2,
        icons: <FaRedo />,
        title: this.props.intl.formatMessage({id: "30daysReturn"}),
        text:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, similique!",
      },
      {
        id: 3,
        icons: <FaDollarSign />,
        title: this.props.intl.formatMessage({id: "securePayment"}),
        text:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, similique!",
      },
    ],
  };

  render() {

    return (
      <ServicesWrapper className="py-5">
        <div className="container">
          <div className="row">
            {this.state.services.map((item) => {
              return (
                <div
                  className="col-10 mx-auto col-sm-6 col-md-4 text-center my-3"
                  key={item.id}
                >
                  <div className="service-icon">{item.icons}</div>
                  <div className="mt-3 text-capitalize font-weight-bold">{item.title}</div>
                  <div className="mt-3">{item.text}</div>
                </div>
              );
            })}
          </div>
        </div>
      </ServicesWrapper>
    );
  }
}

const ServicesWrapper = styled.section`
  background: rgba(95, 183, 234, 0.5);
  .service-icon {
    font-size: 2.5rem;
    color: var(--primaryColor);
  }
  p {
    color: var(--darkGrey);
  }
`;

export default injectIntl(Services)
