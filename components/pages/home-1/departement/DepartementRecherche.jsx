import Image from "next/image";
import "@/app/departement/Departement.scss";

function DepartementRecherche() {
  return (
    <div className="container-departement">
      <div className=" container      ">
        <div className="d-flex  align-items-center  flex-column  flex-md-row  container  section-departement                 ">
          {" "}
          <Image
            src="/image/AFEC/departement-recherche.jpg"
            width={250}
            height={250}
            className="img-fluid  image-departement        "
          />
          <div className="text-center hero-departement d-flex  flex-column   gap-3  mt-3    text-md-start    ">
            <h3>Département Recherche & Développement </h3>
            <h6>""Passeur de technologies vers l'industrie du futur"</h6>
            <p className="aaa        ">
              Ce pôle stratégique développe des innovations opérationnelles et
              brevetables, en synergie étroite avec le Génie Civil.
              <br />
              Il a perfectionné les systèmes{" "}
              <span className="fw-bold   "> POLY-BOOT™ </span> et{" "}
              <span className="fw-bold   "> ECO-BOOT™ </span> , et créé des
              outils pragmatiques comme la{" "}
              <span className="fw-bold   ">
                {" "}
                CALCULETTE VITESSE DE COULAGE®
              </span>
              .​ Nos recherches actuelles ciblent l’optimisation des procédés
              constructifs et l’élargissement de notre offre via une veille
              techno-environnementale active.
            </p>
          </div>
        </div>
        <div className="text-center d-flex flex-column gap-4 mt-5 mb-5    ">
          <h3>Réservez votre consultation </h3>
          <h1>
            De l'esquisse à la réalisation : des constructions sûres, durables
            et innovantes
          </h1>
          <h3>Passons à l'action</h3>
        </div>
      </div>
    </div>
  );
}

export default DepartementRecherche;
