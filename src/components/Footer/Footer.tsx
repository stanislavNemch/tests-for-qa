import css from "./Footer.module.css";
import { IoMdHeart } from "react-icons/io";

const Footer = () => {
    return (
        <footer className={css.footer}>
            <p>
                © 2021 | All Rights Reserved | Developed with{" "}
                <IoMdHeart size={16} className={css.heartIcon} /> by GoIT
                Students
            </p>
        </footer>
    );
};

export default Footer;
