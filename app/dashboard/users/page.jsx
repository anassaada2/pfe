// app/dashboard/users/page.jsx
import styles from "@/components/dashboard/users/users.module.scss";
import Search from "@/components/dashboard/search/Search";
import Image from "next/image";
import PaginationDash from "@/components/dashboard/pagination/PaginationDash";
import FormAddUser from "@/components/dashboard/form/FormAddUser";
import Link from "next/link";
import { fetchUsers } from "@/lib/fetchData";
import { deleteUser, updateUser } from "@/lib/actions";
import FormModifierUser from "@/components/dashboard/form/FormModifierUser";

export default async function Page({ searchParams }) {
  const page = parseInt(searchParams?.page) || 1;
  const limit = 5;

  const { users, totalUsers } = await fetchUsers(page, limit);
  const totalPages = Math.ceil(totalUsers / limit);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="search for a user" />
        <button
          className={styles.addButton}
          data-bs-toggle="modal"
          data-bs-target="#addUserModal"
        >
          Add New
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className={styles.user}>
                    <Image
                      src="/image/AFEC/logo.png"
                      alt="user"
                      width={50}
                      height={50}
                    />
                    <span>{user.username}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                  <div className={styles.buttons}>
                    <button
                      className={`${styles.button} ${styles.view}`}
                      data-bs-toggle="modal"
                      data-bs-target={`#viewUserModal-${user._id}`}
                    >
                      View
                    </button>

                    <form action={deleteUser}>
                      <input
                        type="hidden"
                        name="id"
                        value={user._id.toString()}
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
              <td colSpan="5">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modals placés en dehors du tableau */}
      {users?.map((user) => (
        <div
          key={`modal-${user._id}`}
          className="modal fade"
          id={`viewUserModal-${user._id.toString()}`}
          tabIndex="-1"
          aria-labelledby="viewUserModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="viewUserModalLabel">
                  Edit User
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <FormModifierUser
                user={{
                  _id: user._id.toString(),
                  username: user.username,
                  email: user.email,
                  phone: user.phone || "",
                  status: user.status,
                  role: user.role,
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
        id="addUserModal"
        tabIndex="-1"
        aria-labelledby="addUserModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addUserModalLabel">
                Add New User
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <FormAddUser />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
