import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import css from "./Header.module.css";
import logoUrl from "../../assets/logo.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosLogOut } from "react-icons/io";

const Header = () => {
    const { isLoggedIn, user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add(css.noScroll);
        } else {
            document.body.classList.remove(css.noScroll);
        }
        return () => {
            document.body.classList.remove(css.noScroll);
        };
    }, [isMenuOpen]);

    return (
        <header className={css.header}>
            <Link to="/" className={css.logo}>
                <img
                    src={logoUrl}
                    alt="ProTest Logo"
                    className={css.logoIcon}
                />
            </Link>
            <button className={css.hamburgerMenu} onClick={toggleMenu}>
                <GiHamburgerMenu size={20} />
            </button>
            <nav className={`${css.nav} ${isMenuOpen ? css.navOpen : ""}`}>
                {isLoggedIn ? (
                    <>
                        <Link to="/">Home</Link>
                        <Link to="/useful-info">Materials</Link>
                        <Link to="/contacts">Contacts</Link>
                        <div className={css.user}>
                            <span>{user?.email[0].toUpperCase()}</span>
                            <p>{user?.email.split("@")[0]}</p>
                        </div>
                        <button onClick={logout} className={css.logoutButton}>
                            <IoIosLogOut size={16} />
                        </button>
                    </>
                ) : (
                    <Link to="/contacts">Contacts</Link>
                )}
            </nav>
        </header>
    );
};

export default Header;