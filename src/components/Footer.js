import React, { Component } from "react";
import styled from "styled-components";

import { socialData } from "../context/socialData";

export default class Footer extends Component {
  render() {
    return (
      <FooterWrapper>
        <div className="container py-3">
          <div className="row">
            <div className="col-md-6">
              <p className="text-capitalize text-center">
                copyright &copy; customers management app{" "}
                {new Date().getFullYear()}. all rights reserved
              </p>
            </div>
            <div className=" col-md-6 d-flex justify-content-around">
              {socialData.map((item) => (
                <a href={item.path} key={item.id}>
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </FooterWrapper>
    );
  }
}

const FooterWrapper = styled.footer`
  background: var(--darkGrey);
  color: var(--mainWhite);
  .icon {
    font-size: 1.5rem;
    color: var(--mainWhite);
    transition: var(--mainTransition);
  }
  .icon:hover {
    color: var(--primaryColor);
    cursor: pointer;
  }
`;
