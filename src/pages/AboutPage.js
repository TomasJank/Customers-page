import React from "react";

// ==== Components ====
import Hero from "../components/Hero";
import Info from "../components/AboutPage/Info";
// ==== Components ====

// ==== Services =====
import { aboutBcg } from "../helpers/images-helper";
// ==== Services =====

const AboutPage = () => {
  return (
    <div>
      <Hero img={aboutBcg} />
      <Info></Info>
    </div>
  );
};

export default AboutPage;
