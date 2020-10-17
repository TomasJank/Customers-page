import React from "react";
import { Link } from "react-router-dom";
import { injectIntl } from "react-intl";
// ==== Components ====
import Title from "../Title";
// ==== Components ====

// ==== Services =====
import { aboutBcg } from "../../helpers/images-helper";
// ==== Services =====

const Info = (props) => {
  const {
    intl: { formatMessage },
  } = props;
  return (
    <section className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-6 my-3">
            <img
              src={aboutBcg}
              className="img-fluid img-thumbnail"
              alt="about"
              style={{ background: "var(--darkGrey)" }}
            />
          </div>
          <div className="col-10 mx-auto col-md-6 my-3">
            <Title title={formatMessage({ id: "aboutUs" })} />
            <p className="text-lead text-muted my-3">
              Laborum id ea ex commodo. Veniam ea officia do ex occaecat veniam
              in occaecat. Dolor ipsum fugiat excepteur sunt quis minim irure.
              Elit velit deserunt excepteur incididunt reprehenderit in deserunt
              commodo eiusmod. Consequat dolor magna dolor laborum. Id in
              aliquip id enim fugiat adipisicing aute laboris.
            </p>
            <Link
              to="/customers"
            >
              <button
                className="main-link"
                type="button"
                style={{ marginTop: "2rem" }}
              >
                {" "}
                {formatMessage({ id: "backToProducts" })}{" "}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default injectIntl(Info);
