import styles from "@/components/dashboard/users/users.module.scss";
import Search from "@/components/dashboard/search/Search";
import { fetchCalculateur } from "@/lib/fetchData";
import { deleteCalculateur, updateCalculateur } from "@/lib/actions";
import FormAddCalculateur from "@/components/dashboard/form/FormAddCalculateur";
import FormModifierCalculateur from "@/components/dashboard/form/FormModifierCalculateur";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

export default async function Page() {
  // Fetch the calculateur data (single object or null)
  const calculateurData = await fetchCalculateur();

  // Directly check if the calculateurData exists and is an object
  const calculateur = calculateurData || null;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="rechercher un calculateur" />
        <button
          className={styles.addButton}
          data-bs-toggle="modal"
          data-bs-target="#addCalculateurModal"
        >
          Add New
        </button>
      </div>

      {/* Display table only if calculateur is present */}
      {calculateur ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>View</th>
              <th>Telecharger</th>
              <th>Excel</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr key={calculateur._id}>
              <td>
                <div className={styles.calculateur}>
                  <span>{calculateur.name}</span>
                </div>
              </td>
              <td>{calculateur.view || "0"}</td>
              <td>{calculateur.telechargement || "0"}</td>
              <td>
                {calculateur.url ? (
                  <div className={styles.excelContainer}>
                    <a
                      href={calculateur.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.excelLink}
                    >
                      Fichier Excel
                    </a>
                    {/* L'icône de suppression apparaîtra au survol */}
                    <button className={styles.deleteButton}>
                      <FaTrashAlt />
                    </button>
                  </div>
                ) : (
                  // Si pas de fichier Excel, afficher une icône d'ajout
                  <button>
                    <FaPlus />
                  </button>
                )}
              </td>

              <td>
                <div className={styles.buttons}>
                  <button
                    className={`${styles.button} ${styles.view}`}
                    data-bs-toggle="modal"
                    data-bs-target={`#viewCalculateurModal-${calculateur._id}`}
                  >
                    View
                  </button>
                  <form action={deleteCalculateur}>
                    <input
                      type="hidden"
                      name="id"
                      value={calculateur._id.toString()}
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
          </tbody>
        </table>
      ) : (
        <div>No calculateur found.</div>
      )}

      {/* Modal for editing the calculateur */}
      {calculateur && (
        <div
          key={`modal-${calculateur._id}`}
          className="modal fade"
          id={`viewCalculateurModal-${calculateur._id.toString()}`}
          tabIndex="-1"
          aria-labelledby="viewCalculateurModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="viewCalculateurModalLabel">
                  Edit Calculateur
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <FormModifierCalculateur
                  calculateur={{
                    _id: calculateur._id.toString(),
                    name: calculateur.name,
                    description: calculateur.description || "",
                    url: calculateur.url || "",
                    telechargement: calculateur.telechargement || 0,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for adding new calculateur */}
      <div
        className="modal fade"
        id="addCalculateurModal"
        tabIndex="-1"
        aria-labelledby="addCalculateurModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addCalculateurModalLabel">
                Add New Calculateur
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <FormAddCalculateur />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
