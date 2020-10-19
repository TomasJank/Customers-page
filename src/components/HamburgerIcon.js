import React from "react";
import styled from "styled-components";

const hamburgerHeight = 18;

const hamburgerWidth = Math.round(hamburgerHeight * 1.33);
const stripeHeight = hamburgerHeight / 5;
const Hamburger = styled.button`
  border: none;
  background: none;
  width: ${hamburgerWidth}px;
  height: ${hamburgerHeight}px;
  position: relative;
  margin: 0 auto;
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
  cursor: pointer !important;
  &:focus {
    outline: 0;
  }
  div {
    position: absolute;
    height: ${stripeHeight}px;
    width: 100%;
    background: var(--darkGrey);
    border-radius: ${stripeHeight}px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
  }
`;
const StripeTop = styled.div`
  top: ${(props) => (props.open ? `${stripeHeight * 2}px` : "0px")};
  width: ${(props) => (props.open ? "0%" : "inherit")} !important;
  left: ${(props) => (props.open ? "50%" : "0")} !important;
`;
const StripeMiddle = styled.div`
  top: ${stripeHeight * 2}px;

  transform: ${(props) =>
    props.first && props.open
      ? "rotate(45deg) !important"
      : props.open
      ? "rotate(-45deg) !important"
      : "none"};
`;
const StripeBottom = styled.div`
  top: ${(props) =>
    props.open ? `${stripeHeight * 2}px` : `${stripeHeight * 4}px`};
  width: ${(props) => (props.open ? "0%" : "inherit")} !important;
  left: ${(props) => (props.open ? "50%" : "0")} !important;
`;

const HamburgerIcon = ({ open, onClick, ...props }) => {
  return (
    <div className="burger" onClick={onClick}>
      <Hamburger className="burger">
        <StripeTop open={open} />
        <StripeMiddle open={open} first />
        <StripeMiddle open={open} />
        <StripeBottom open={open} />
      </Hamburger>
    </div>
  );
};
export default HamburgerIcon;
