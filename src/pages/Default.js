import React from "react";
import { Link } from "react-router-dom";

// ==== Components ====
import Hero from "../components/Hero";
// ==== Components ====

// ==== Helpers ====
import { defaultBcg } from "../helpers/images-helper";
// ==== Helpers ====

const Default = () => {
  return (
    <div>
      <Hero img={defaultBcg} title="404" max="true">
        <h2 className="text-uppercase">page not found</h2>
        <Link to="/" className="main-link" style={{ marginTop: "2rem" }}>
          return home
        </Link>
      </Hero>
    </div>
  );
};

export default Default;
