import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import css from "./Header.module.css";
import logoUrl from "../../assets/logo.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import Navigation from "./Navigation";

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

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 767 && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isMenuOpen]);

    return (
        <header
            className={
                isLoggedIn ? css.header : `${css.header} ${css.headerGuest}`
            }
        >
            <div className={css.logoRow}>
                <Link to="/" className={css.logo}>
                    <img
                        src={logoUrl}
                        alt="ProTest Logo"
                        className={css.logoIcon}
                    />
                </Link>
            </div>
            <div className={css.rightBlock}>
                {/* Мобильный user-блок */}
                {isLoggedIn && user && (
                    <div className={css.userMobile}>
                        <span>{user?.email[0].toUpperCase()}</span>
                    </div>
                )}
                <div className={css.verticalDivider}> </div>
                {/* Кнопка гамбургера */}
                <button className={css.hamburgerMenu} onClick={toggleMenu}>
                    {isMenuOpen ? (
                        <IoMdClose size={28} />
                    ) : (
                        <GiHamburgerMenu size={20} />
                    )}
                </button>
            </div>
            {/* Оверлей и меню */}
            <div
                className={`${css.menuOverlay} ${
                    isMenuOpen ? css.menuOverlayOpen : ""
                }`}
                onClick={closeMenu}
            ></div>
            <Navigation
                isLoggedIn={isLoggedIn}
                user={user ?? undefined}
                logout={logout}
                isMenuOpen={isMenuOpen}
                closeMenu={closeMenu}
            />
        </header>
    );
};

export default Header;
