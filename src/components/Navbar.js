import React from "react";
import { injectIntl } from "react-intl";
import styled from "styled-components";
import { Link } from "react-router-dom";

// ==== Icons ====
import { FaBars } from "react-icons/fa";
import { MdStoreMallDirectory } from "react-icons/md";
// ==== Icons ====

// ==== Components ====
import LangTag from "./LangTag";
// ==== Components ====

// ==== Context API ====
import { ProductConsumer } from "../context/";
// ==== Context API ====

// ==== Redux ====
import { connect } from "react-redux";
import { changeLang } from "../redux/actions";
// ==== Redux ====

const Navbar = (props) => {
  const {
    intl: { formatMessage },
  } = props;

  return (
    <ProductConsumer>
      {(value) => {
        const { handleSidebar } = value;
        return (
          <NavWrapper>
            <div className="nav-center">
              <FaBars className="nav-icon" onClick={handleSidebar} />
              <Link to="/" style={{ textDecoration: "none" }}>
                <MdStoreMallDirectory className="logo" size={40} />
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
  border-bottom: 3px solid var(--primaryColor);
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

export default connect(null, { changeLang })(injectIntl(Navbar));
