import React from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import { changeLang } from "../redux/actions";
import { getLanguage } from "../redux/selectors";

const LangTag = (props) => {
  const handleLanguage = () => {
    const { lang } = props;
    var newLang = lang === "en" ? "lt" : "en";
    props.changeLang(newLang);
  };

  const { lang } = props;
  return (
    <LangTagWrapper>
      <div className="language-icon noselect" href="#" onClick={handleLanguage}>
        {lang === "en" && <span>LT</span>}
        {lang === "lt" && <span>EN</span>}
      </div>
    </LangTagWrapper>
  );
};

const mapStateToProps = (state) => {
  const lang = getLanguage(state);

  return { lang };
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

export default connect(mapStateToProps, { changeLang })(LangTag);
