import React from "react";
import styled from "styled-components";

// ==== Helpers ====
import { mainBcg } from "../helpers/images-helper";
// ==== Helpers ====

const Hero = ({ img, title, max, children, color }) => {
  return (
    <HeroWrapper max={max} img={img}>
      <div className="banner">
        <h1 className="title">{title}</h1>
        {children}
      </div>
    </HeroWrapper>
  );
};

const HeroWrapper = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${(props) => (props.max ? "100vh" : "60vh")};
  background: linear-gradient(var(--primaryRGBA), var(--primaryRGBA)),
    url(${(props) => props.img}) center/cover no-repeat;
  .title {
    color: var(--mainWhite);
    padding: 2rem;
    font-size: 3.5rem;
    text-shadow: 4px 4px 2px rgba(0, 0, 0, 0.3);
    text-transform: uppercase;
    letter-spacing: var(--mainSpacing);
    /* word-break:break-word; */
  }
`;

Hero.defaultProps = {
  img: mainBcg,
};

export default Hero;
