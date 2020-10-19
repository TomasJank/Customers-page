import React from "react";
import styled from "styled-components";

// ==== Context API ====
import { ProductConsumer } from "../context/";
// ==== Context API ====

const LangTag = () => {
  return (
    <ProductConsumer>
      {(value) => {
        const { language, setLanguage } = value;
        return (
          <LangTagWrapper>
            <div
              className="language-icon noselect"
              href="#"
              onClick={setLanguage}
            >
              {language === "en" && <span>LT</span>}
              {language === "lt" && <span>EN</span>}
            </div>
          </LangTagWrapper>
        );
      }}
    </ProductConsumer>
  );
};

const LangTagWrapper = styled.div`
  .language-icon:hover {
    opacity: 0.7;
    cursor: pointer;
  }

  .language-icon {
    height: 100%;
    color: var(--mainWhite);
    font-weight: bold;
    background: var(--primaryColor);
    padding: 0.3rem 0.5rem;
    border-radius: 0.5rem;
    transition: var(--mainTransition);
  }
`;

export default (LangTag);
