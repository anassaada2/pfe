import Image from "next/image";
import Link from "next/link";

export default function Philosophie() {
  return (
    <div className="about-section padding-top-140 philosophie-container    mb-5">
      <div className="container   ">
        <div className="row gutter-x-40 align-items-center row align-items-center justify-content-center gutter-y-40">
          <div
            className="col-xl-5  col-lg-5 col-md-6 col-xs-7 col-8"
            data-aos-duration={1000}
            data-aos="fade-right"
          >
            <div className="about-image-3">
              <Image
                height={214}
                width={210}
                src="/image/AFEC/logo2.jpg"
                alt="structure"
                className="w-100 h-auto"
              />
            </div>
          </div>
          <div
            className="offset-xl-1  col-xxl-6 col-xl-6 col-lg-7 col-md-8 col-auto"
            data-aos-duration={1000}
            data-aos="fade-left"
          >
            <div className="content-text-block-wrapper">
              <div className="content-text-block">
                <span className="subtitle">Notre Philosophie </span>
                <h2 className="content-title heading-md mb-32 text-center   ">
                  "Construire l'Avenir avec Responsabilité & Innovation"
                </h2>
                <p>
                  Chez <span className="afec-span        "> AFEC </span> , nous
                  croyons que l'ingénierie moderne doit allier{" "}
                  <span className="fw-bold    ">
                    {" "}
                    rigueur technique, ambition environnementale{" "}
                  </span>{" "}
                  et <span className="fw-bold    "> vision humaine. </span>
                  <br /> Notre mission va au-delà de la simple conception de
                  structures :<br /> nous façonnons des écosystèmes résilients
                  où la sécurité, la durabilité et l'efficacité coexistent
                  harmonieusement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
