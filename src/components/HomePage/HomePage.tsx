import { Link } from "react-router-dom";
import css from "./HomePage.module.css";

const HomePage = () => {
    return (
        <div className={css.mainContent}>
            <div className={css.quote}>
                <p className={css.quoteText}>
                    “Regression testing. What is it?
                </p>
                <p className={css.quoteText}>
                    If the system compiles, that's good, if it boots, that's
                    great!”
                </p>
                <p className={css.author}>Linus Torvalds</p>
                <p className={css.authorInfo}>
                    Linux kernel creator, hacker, 1969
                </p>
            </div>
            <div className={css.cards}>
                <Link to="/test/tech" className={`${css.card} ${css.cardDark}`}>
                    <h3>QA technical training</h3>
                    <span className={css.arrow}>→</span>
                </Link>
                <Link to="/test/theory" className={`${css.card} ${css.cardOrange}`}>
                    <h3>Testing theory</h3>
                    <span className={css.arrow}>→</span>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
