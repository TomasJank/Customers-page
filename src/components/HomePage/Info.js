import React from "react";
import { injectIntl } from "react-intl";
// ==== Components ====
import Title from "../Title";
// ==== Components ====

// ==== Services =====
import { aboutBcg } from "../../assets/image-assets";
// ==== Services =====

const Info = (props) => {
  const {
    intl: { formatMessage },
  } = props;
  return (
    <section className="py-5" data-aos="fade-in">
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
            <Title title={formatMessage({ id: "aboutApp" })} />
            <p className="text-lead text-muted my-3">
              Nulla facilisis ultrices turpis, tincidunt efficitur sem volutpat
              sed. Phasellus tristique facilisis molestie. Nam blandit aliquam
              nisl mattis blandit. Nam vulputate pretium faucibus. Aliquam ut
              ultricies orci. Morbi eu ligula maximus, porttitor metus lacinia,
              fermentum odio. Aliquam et risus sed quam molestie tincidunt.
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
              posuere cubilia curae; Nam urna sem, pulvinar sed sollicitudin et,
              sagittis vitae sapien. Mauris nisi dolor, aliquam quis malesuada
              eu, vulputate eget leo. Pellentesque habitant morbi tristique
              senectus et netus et malesuada fames ac turpis egestas. Aliquam
              commodo maximus nunc, a convallis magna varius sed. In hac
              habitasse platea dictumst. Phasellus ac felis molestie erat
              convallis suscipit. Cras id interdum dolor.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default injectIntl(Info);
