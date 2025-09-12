import css from "./Footer.module.css";
import { IoMdHeart } from "react-icons/io";
import { MdCopyright } from "react-icons/md";

const Footer = () => {
    return (
        <footer>
            <section className={css.footer}>
                <div className={css.container}>
                    <div className={css.footerText}>
                        <div className={css.copyrightLine}>
                            <MdCopyright
                                size={18}
                                className={css.copyrightIcon}
                            />{" "}
                            2021 | All Rights Reserved | Developed with
                            <IoMdHeart size={16} className={css.heartIcon} />
                        </div>
                        <div className={css.byGoIT}>
                            by{" "}
                            <span className={css.textGoIT}>GoIT Students</span>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    );
};

export default Footer;
