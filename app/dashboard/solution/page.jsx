// app/dashboard/solutions/page.jsx
import styles from "@/components/dashboard/users/users.module.scss";
import Search from "@/components/dashboard/search/Search";
import Image from "next/image";
import PaginationDash from "@/components/dashboard/pagination/PaginationDash";
import Link from "next/link";
import { fetchsolutions, fetchSolutions } from "@/lib/fetchData";
import { deleteSolution, updatesolution } from "@/lib/actions";

import FormAddSolution from "@/components/dashboard/form/FormAddSolution";
import FormModifierSolution from "@/components/dashboard/form/FormModifierSolution";

export default async function Page({ searchParams }) {
  const page = parseInt(searchParams?.page) || 1;
  const limit = 5;

  const { solutions, totalsolutions } = await fetchSolutions(page, limit);
  const totalPages = Math.ceil(totalsolutions / limit);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="rechercher une fiche technique " />
        <button
          className={styles.addButton}
          data-bs-toggle="modal"
          data-bs-target="#addsolutionModal"
        >
          Add New
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>name</th>
            <th>Views</th>

            <th>Likes</th>
            <th>Telechargér</th>

            <th>pdf</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(solutions) && solutions.length > 0 ? (
            solutions.map((solution) => (
              <tr key={solution._id}>
                <td>
                  <div className={styles.solution}>
                    <span>{solution.name}</span>
                  </div>
                </td>
                <td>{solution.name}</td>
                <td>{solution.name}</td>
                <td>{solution.name}</td>
                <td>
                  {solution.pdf && (
                    <a
                      href={solution.pdf}
                      target="_blank"
                      rel="noreferrer"
                      className="d-block mt-2"
                    >
                      Voir le PDF
                    </a>
                  )}
                </td>
                <td>
                  <div className={styles.buttons}>
                    <button
                      className={`${styles.button} ${styles.view}`}
                      data-bs-toggle="modal"
                      data-bs-target={`#viewsolutionModal-${solution._id}`}
                    >
                      View
                    </button>

                    <form action={deleteSolution}>
                      <input
                        type="hidden"
                        name="id"
                        value={solution._id.toString()}
                      />
                      <button
                        className={`${styles.button} ${styles.delete}`}
                        type="submit"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No solutions found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modals placés en dehors du tableau */}
      {solutions?.map((solution) => (
        <div
          key={`modal-${solution._id}`}
          className="modal fade"
          id={`viewsolutionModal-${solution._id.toString()}`}
          tabIndex="-1"
          aria-labelledby="viewsolutionModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered  modal-xl ">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="viewsolutionModalLabel">
                  Edit solution
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <FormModifierSolution
                solution={{
                  _id: solution._id.toString(),
                  name: solution.name,
                  description: solution.description || "",
                  avantages: solution.avantages || [],
                  specifications: solution.specifications || [], // Spécifications
                  certifications: solution.certifications || [], // Certifications
                  processusInstallation: solution.processusInstallation || [], // Processus d'installation
                  ecarteur: solution.ecarteur || "", // Exemple d'écarteur
                  dessinTechnique: {
                    sectionBlocs: solution.dessin_technique?.sectionBlocs || "", // Section Blocs
                    sectionDalle: solution.dessin_technique?.sectionDalle || "", // Section Dalle
                  },
                  images: solution.images || [],
                  pdf: solution.pdf || "",
                  saviezVous: solution.saviezVous || "", // Le saviez-vous ?
                }}
              />
            </div>
          </div>
        </div>
      ))}

      <PaginationDash totalPages={totalPages} currentPage={page} />

      {/* Modal d'ajout d'utilisateur */}
      <div
        className="modal fade"
        id="addsolutionModal"
        tabIndex="-1"
        aria-labelledby="addsolutionModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered  modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addsolutionModalLabel">
                Add New solution
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <FormAddSolution />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
