import React from "react";
import { injectIntl } from "react-intl";
import styled from "styled-components";
import { Link } from "react-router-dom";

// ==== Icons ====
import { FaUsers } from "react-icons/fa";
// ==== Icons ====

// ==== Components ====
import LangTag from "./LangTag";
import HamburgetIcon from "./HamburgerIcon";
// ==== Components ====

// ==== Context API ====
import { ProductConsumer } from "../context/";
// ==== Context API ====
const Navbar = (props) => {
  const {
    intl: { formatMessage },
  } = props;
  return (
    <ProductConsumer>
      {(value) => {
        const { handleSidebar, sidebarOpen } = value;
        return (
          <NavWrapper>
            <div className="nav-center">
              <HamburgetIcon open={sidebarOpen} onClick={handleSidebar} />
              {/* <FaBars className="nav-icon" onClick={handleSidebar} /> */}
              <Link to="/" style={{ textDecoration: "none" }}>
                <FaUsers className="logo" size={30} />
                <span className="text-main font-weight-bold noselect">
                  {" "}
                  {formatMessage({ id: "customersManagement" })}
                </span>
              </Link>
              <LangTag currentLanguage={props.currentLanguage} />
            </div>
          </NavWrapper>
        );
      }}
    </ProductConsumer>
  );
};

const NavWrapper = styled.nav`
  position: sticky;
  top: 0;
  position: -webkit-sticky;
  width: 100%;
  z-index: 10;
  padding: 1rem 1.5rem;
  background: var(--mainGrey);
  border-bottom: 3px solid var(--darkGrey);
  .nav-center {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1170px;
    margin: 0 auto;
  }

  .nav-icon {
    transform: scale(1.1);
    font-size: 1.5 rem;
    transition: var(--mainTransition);
    cursor: pointer;
  }

  .logo {
    color: var(--primaryColor);
  }

  .nav-icon:hover {
    /* transform: scale(1.2); */
    opacity: 0.7;
    cursor: pointer;
  }

  .cart-items {
    background: var(--primaryColor);
    font-size: 0.85rem;
    position: absolute;
    top: -8px;
    right: -8px;
    padding: 0 5px;
    border-radius: 50%;
  }
`;

export default (injectIntl(Navbar));
