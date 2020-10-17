import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { injectIntl } from "react-intl";



// ==== Components ====
import Hero from "../components/Hero";
// ==== Components ====


// Geocode.setApiKey(keys.googleMapApi);

const HomePage = (props) => {
  const {
    intl: { formatMessage },
  } = props;


  useEffect(() => {
    // Geocode.fromAddress('Raseiniai Lithuania 60179').then(
    //   response => {
    //     const { lat, lng } = response.results[0].geometry.location;
    //     console.log('apaejo', lat, lng);
    //   },
    //   error => {
    //     console.log("nepaejo")
    //     console.error(error);
    //   },
    // );  
  }, [])

  return (
    <div>
      <Hero title={formatMessage({ id: "welcome" })} max="true">
        <Link
          to="/customers-list"
          className="main-link"
          style={{ margin: "2rem" }}
        >
          {formatMessage({ id: "your customers" })}
        </Link>

        <Link
          to="/customers/new"
          className="main-link"
          style={{ margin: "2rem" }}
        >
          {formatMessage({ id: "add new customer" })}
        </Link>
      </Hero>
    </div>
  );
};

export default injectIntl(HomePage);
