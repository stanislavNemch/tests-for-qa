import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import css from "./Header.module.css";
import logoUrl from "../../assets/logo.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosLogOut } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const Header = () => {
    const { isLoggedIn, user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const closeMenu = () => setIsMenuOpen(false);

    // Закрытие по ESC
    useEffect(() => {
        if (!isMenuOpen) return;
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeMenu();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isMenuOpen]);

    // Блокировка скролла
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
                {isMenuOpen ? (
                    <IoMdClose size={28} />
                ) : (
                    <GiHamburgerMenu size={20} />
                )}
            </button>
            {/* Оверлей и меню */}
            <div
                className={`${css.menuOverlay} ${
                    isMenuOpen ? css.menuOverlayOpen : ""
                }`}
                onClick={closeMenu}
            ></div>
            <nav className={`${css.nav} ${isMenuOpen ? css.navOpen : ""}`}>
                {isLoggedIn ? (
                    <>
                        <Link to="/" onClick={closeMenu}>
                            Home
                        </Link>
                        <Link to="/useful-info" onClick={closeMenu}>
                            Materials
                        </Link>
                        <Link to="/contacts" onClick={closeMenu}>
                            Contacts
                        </Link>
                        <div className={css.user}>
                            <span>{user?.email[0].toUpperCase()}</span>
                            <p>{user?.email.split("@")[0]}</p>
                        </div>
                        <button
                            onClick={() => {
                                logout();
                                closeMenu();
                            }}
                            className={css.logoutButton}
                        >
                            <IoIosLogOut size={16} />
                        </button>
                    </>
                ) : (
                    <Link to="/contacts" onClick={closeMenu}>
                        Contacts
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Header;
