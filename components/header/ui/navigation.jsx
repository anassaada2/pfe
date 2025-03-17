"use client";
import navigation from "@/data/navigation";
import { isParentActive } from "@/lib/is-menu-active";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const path = usePathname();

  return (
    <>
      <ul className="site-menu-main">
        {navigation?.map((item, i) => (
          <li key={i} className="nav-item nav-item-has-children">
            {!item.dropdown ? (
              <Link
                href={item.url}
                className={`nav-link-item drop-trigger ${
                  path === item.url ? "ui-nav-active" : ""
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <>
                <a
                  className={`nav-link-item drop-trigger ${
                    isParentActive(item, path) ? "ui-nav-active" : ""
                  }`}
                >
                  {item.label}
                  {item.dropdown ? <i className="fas fa-angle-down" /> : null}
                </a>
                <div className="sub-menu" id="submenu-3">
                  <ul className="sub-menu_list">
                    {item.dropdown?.map((item2, i2) =>
                      !item2.dropdown ? (
                        <li key={i2} className="sub-menu_item">
                          <Link href={item2.url}>
                            <span
                              className={`menu-item-text ${
                                item2.url === path ? "active" : ""
                              }`}
                            >
                              {item2.label}
                            </span>
                          </Link>
                        </li>
                      ) : (
                        <li
                          key={i2}
                          className="sub-menu_item nav-item-has-children child-item"
                        >
                          <a className="sub-menu__item-link">
                            <span
                              className={`menu-item-text ${
                                isParentActive(item2, path) ? "active" : ""
                              }`}
                            >
                              {item2.label}
                            </span>
                            <i className="fas fa-angle-right" />
                          </a>
                          <div className="sub-menu child-sub" id="submenu-22">
                            <ul className="sub-menu_list">
                              {item2.dropdown.map((item3, i3) => (
                                <li key={i3} className="sub-menu_item">
                                  <Link href={item3.url}>
                                    <span
                                      className={`menu-item-text ${
                                        item3.url === path ? "active" : ""
                                      }`}
                                    >
                                      {item3.label}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
