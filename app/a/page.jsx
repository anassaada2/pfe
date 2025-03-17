import Image from "next/image";
import styles from "@/app/anas/Histoire.module.scss";
import { TimelineMois } from "@/data/site";

function page() {
  return (
    <div className="container bg-success">
      <div className="container bg-warning d-flex">
        {/* Left Column - Images */}
        <div className="container">
          {TimelineMois.map((mois, index) => (
            <div
              key={index}
              className="d-flex justify-content-center align-items-center mr-0"
            >
              <div className="text-center">
                <div>{mois.mois}</div>

                {mois.mois !== "NOVEMBRE 2024" && (
                  <img
                    src={mois.img}
                    alt={mois.mois}
                    width={50}
                    height={118}
                    className="mx-auto" // Centrer l'image horizontalement
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Middle Column - Timeline */}
        <div className={`d-flex flex-column ${styles.container}`}>
          <div className={styles.line}></div>
          {[...Array(5)].map((_, index) => (
            <>
              <div key={index} className={`rounded-circle ${styles.circle}`}>
                {index + 1}
              </div>
              {index === 1 && <div className={styles.spacing}></div>}{" "}
              {index === 2 && <div className={styles.spacing}></div>}{" "}
            </>
          ))}
        </div>
        {/* Right Column - Text */}
        <div className="timeline">
          {TimelineMois?.map((mois, index) => (
            <div key={index} className="d-flex flex-column mt-1">
              <h5 className={styles.titre}>{mois.titre}</h5>
              <p className={styles["p-text"]}>{mois?.description}</p>{" "}
              {/* Appliquer la classe ici */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
