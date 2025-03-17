import Brand from "@/components/pages/home-1/brand";
import BrandDepartement from "@/components/pages/home-1/departement/BrandDepartement";
import Link from "next/link";
import "@/components/ui/sections/faq.scss";
import Image from "next/image";

export default function Faq() {
  return (
    <div className="   faq-section section-padding-100">
      <div className="container">
        <div className="faq-brand   row row--custom gutter-y-40 ">
          <div className="col-xxl-4 col-lg-5 col-md-9">
            <div className="faq-content">
              <div className="faq-content__text-block">
                <span className="subtitle">Nos Projets</span>
                <h1 className="faq-content__title heading-md text-black mb-res-60">
                  L’Innovation à l’Épreuve de la Réalité
                </h1>
                <Image
                  height={180}
                  width={280}
                  src="/image/AFEC/projets.jpg"
                  alt="logo"
                  className=""
                />
              </div>
            </div>
          </div>
          <div className="col-xxl-7 offset-lg-1 col-lg-6">
            <div className="accordion-style">
              {/* faq collapse start */}
              <div className="accordion-style" id="faq-02">
                <div className="accordion-item">
                  <button
                    className="accordion-button "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-02-item"
                    aria-expanded="true"
                    aria-controls="faq-02-item"
                  >
                    Expertises
                  </button>
                  <div
                    id="faq-02-item"
                    className="accordion-collapse collapse show"
                    data-bs-parent="#faq-02"
                  >
                    <div className="accordion-item__body">
                      ● Mise en sécurité de l’hôtel de Fourcy à Paris : Hôtel
                      particulier classé monument historique. <br />● Expertise
                      dans le but de renforcement et de réhabilitation d'une
                      salle des fêtes historique à Sfax.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-02-item-2"
                    aria-expanded="false"
                    aria-controls="faq-02-item-2"
                  >
                    Sécurité incendie​{" "}
                  </button>
                  <div
                    id="faq-02-item-2"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faq-02"
                  >
                    <div className="accordion-item__body">
                      ● Centre Hospitalier régional de BONDOUKOU​ <br />●
                      Approbation des dossiers de sécurité incendie pour le
                      compte de STC VERITAS : Complexes résidentiels &
                      bureautiques , réaménagement des Hôtels Novotel, HILTON à
                      Tunis, Radisson Blu, Vencci, Yadis à Djerba.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-02-item-3"
                    aria-expanded="false"
                    aria-controls="faq-02-item-3"
                  >
                    Projets réalisés ou en cours de réalisation avec ECO-BOOT &
                    POLY-BOOT
                  </button>
                  <div
                    id="faq-02-item-3"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faq-02"
                  >
                    <div className="accordion-item__body">
                      ● Villas de maitre <br /> ● Complexes immobiliers à Tunis,
                      Sfax, Gabes et Djerba <br /> ● Parking à Etage à Ben Ghazi
                      <br /> ● Hôpital des enfants à Ben Ghazi
                    </div>
                  </div>
                </div>
              </div>
              {/* faq collapse end */}
            </div>
          </div>
        </div>
        <div className="text-center mb-5    ">
          <h4 className="subtitle           ">nos partenaires </h4>
          <h1>
            Nos principaux clients potentiels qui nous ont accordé leur
            confiance sont
          </h1>
        </div>
        <Brand />
      </div>
    </div>
  );
}
