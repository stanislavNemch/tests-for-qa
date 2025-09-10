import css from "./Footer.module.css";
import { IoMdHeart } from "react-icons/io";
import { MdCopyright } from "react-icons/md";

const Footer = () => {
    return (
        <footer className={css.footer}>
            <p className={css.footerText}>
                <MdCopyright size={16} /> 2021 | All Rights Reserved | Developed
                with <IoMdHeart size={16} className={css.heartIcon} /> by{" "}
                <span className={css.textGoIT}>GoIT Students</span>
            </p>
        </footer>
    );
};

export default Footer;
