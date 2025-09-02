import { useAuth } from "../context/AuthContext";
import css from "./Header.module.css";
import logoUrl from "../../assets/logo.svg";

const Header = () => {
    const { isLoggedIn, user, logout } = useAuth();

    return (
        <header className={css.header}>
            <div className={css.logo}>
                <img
                    src={logoUrl}
                    alt="ProTest Logo"
                    className={css.logoIcon}
                />
            </div>
            <nav className={css.nav}>
                {isLoggedIn ? (
                    <>
                        <a href="#home">Home</a>
                        <a href="#materials">Materials</a>
                        <a href="#contacts">Contacts</a>
                        <div className={css.user}>
                            <span>{user?.email[0].toUpperCase()}</span>
                            <p>{user?.email.split("@")[0]}</p>
                        </div>
                        <button onClick={logout} className={css.logoutButton}>
                            Logout
                        </button>
                    </>
                ) : (
                    <a href="#contacts">Contacts</a>
                )}
            </nav>
        </header>
    );
};

export default Header;
