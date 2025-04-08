import styles from "@/components/dashboard/users/users.module.scss";
import Search from "@/components/dashboard/search/Search";
import Link from "next/link";
import Image from "next/image";
function page() {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="search for a user" />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
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
          <tr>
            <div className={styles.user}>
              <Image
                src="/image/AFEC/logo.png"
                alt="user"
                width={50}
                height={50}
              />
              <td>John Doe</td>
            </div>
            <td> anas@gmail.com </td>
            <td> anas@gmail.com </td>
            <td> anas@gmail.com </td>
            <td> anas@gmail.com </td>

            <td>
              <div className={styles.buttons}>
                <Link href="/">
                  <button className={`${styles.button} ${styles.view}`}>
                    View
                  </button>
                </Link>
                <button className={`${styles.button} ${styles.delete}`}>
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default page;
