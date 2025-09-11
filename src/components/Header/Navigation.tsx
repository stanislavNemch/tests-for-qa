import { NavLink, Link } from "react-router-dom";
import css from "./Header.module.css";
import { IoIosLogOut } from "react-icons/io";

interface NavigationProps {
    isLoggedIn: boolean;
    user?: { email: string };
    logout: () => void;
    isMenuOpen: boolean;
    closeMenu: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
    isLoggedIn,
    user,
    logout,
    isMenuOpen,
    closeMenu,
}) => (
    <nav className={`${css.nav} ${isMenuOpen ? css.navOpen : ""}`}>
        {isLoggedIn ? (
            <>
                <NavLink
                    to="/"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                        isActive ? `${css.link} ${css.active}` : css.link
                    }
                >
                    Home
                </NavLink>
                <div className={css.divider}>
                    <svg width="100%" height="1">
                        <use xlinkHref="#divider-line" />
                    </svg>
                </div>
                <NavLink
                    to="/useful-info"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                        isActive ? `${css.link} ${css.active}` : css.link
                    }
                >
                    Materials
                </NavLink>
                <div className={css.divider}>
                    <svg width="100%" height="1">
                        <use xlinkHref="#divider-line" />
                    </svg>
                </div>
                <NavLink
                    to="/contacts"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                        isActive ? `${css.link} ${css.active}` : css.link
                    }
                >
                    Contacts
                </NavLink>
                <div className={css.divider}>
                    <svg width="100%" height="1">
                        <use xlinkHref="#divider-line" />
                    </svg>
                </div>
                <div className={css.rightBlock}>
                    <div className={css.userDesktop}>
                        <span>{user?.email[0].toUpperCase()}</span>
                        <p>{user?.email.split("@")[0]}</p>
                    </div>
                    {!isMenuOpen && (
                        <div className={css.verticalDividerTablet}>
                            <svg width="1" height="68">
                                <use xlinkHref="#divider-line" />
                            </svg>
                        </div>
                    )}
                    <button
                        onClick={() => {
                            logout();
                            closeMenu();
                        }}
                        className={css.logoutButton}
                    >
                        <IoIosLogOut size={16} />
                    </button>
                </div>
            </>
        ) : (
            <Link to="/contacts" onClick={closeMenu}>
                Contacts
            </Link>
        )}
    </nav>
);

export default Navigation;
