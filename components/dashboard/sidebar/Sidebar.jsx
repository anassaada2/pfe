import Image from "next/image";
import MenuLink from "./menuLink/MenuLink";
import styles from "./sidebar.module.scss";
import { menuItemsDashboard } from "@/data/site";
import { MdLogout } from "react-icons/md";
function Sidebar() {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src="/image/AFEC/logo.png"
          alt=""
          width="50"
          height="50"
        />
        <div className={styles.userDetail}>
          <span className={styles.username}> anas </span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>

      <ul className={styles.list}>
        {menuItemsDashboard?.map((cat, index) => (
          <li key={index}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item, index) => (
              <MenuLink item={item} key={index} />
            ))}
          </li>
        ))}
      </ul>
      <button className={styles.logout}>
        <MdLogout />
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
