import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { injectIntl } from "react-intl";

import { linkData } from "../context/linkData";

// ==== Context API ====
import { ProductConsumer } from "../context";
import SideBarIcons from "./CustomersPage/SideBarIcons";
// ==== Context API ====
const SideBar = (props) => {
  return (
    <ProductConsumer>
      {(value) => {
        const { sidebarOpen, handleSidebar } = value;
        const {
          intl: { formatMessage },
        } = props;

        return (
          <SideWrapper className="sidebar" show={sidebarOpen}>
            <ul>
              {linkData.map((link) => {
                return (
                  <li key={link.id}>
                    <Link
                      to={link.path}
                      className="sidebar-link"
                      onClick={handleSidebar}
                    >
                      <div className="d-flex justify-between align-items-center">
                        <SideBarIcons
                          iconType={link.text}
                          size={20}
                          color={"var(--mainBlack)"}
                        />
                        <div className="ml-2">
                          {formatMessage({ id: `${link.text}` })}
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </SideWrapper>
        );
      }}
    </ProductConsumer>
  );
};

const SideWrapper = styled.nav`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--mainGrey);
  z-index: 1;
  border-right: 4px solid var(--darkGrey);
  transition: var(--mainTransition);
  transform: ${(props) => (props.show ? "translateX(0)" : "translateX(-100%)")};

  ul {
    list-style-type: none;
    padding: 0 !important;
  }

  .sidebar-link {
    display: block;
    font-size: 1.5rem;
    text-transform: capitalize;
    color: var(--mainBlack);
    padding: 0.5rem 1.5rem;
    background: transparent;
    box-shadow:0px 1px 1px rgba(0, 0, 0, 0.3);
    transition: var(--mainTransition);
  }
  .sidebar-link:hover {
    background: var(--primaryColor);
    color: var(--mainWhite);
    padding: 0.5rem 1.5rem 0.5rem 2.5rem;
  }

  @media (min-width: 576px) {
    width: 20rem;
  }
`;

export default injectIntl(SideBar);
