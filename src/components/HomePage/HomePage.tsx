import { Link } from "react-router-dom";
import css from "./HomePage.module.css";
import { GoArrowRight } from "react-icons/go";

const HomePage = () => {
    return (
        <section className="home">
            <div className={css.container}>
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
                <ul className={css.cards}>
                    <li className={`${css.card} ${css.cardDark}`}>
                        <Link to="/test/tech">
                            <h3>QA technical training</h3>
                            <GoArrowRight size={24} color="#fff" />
                        </Link>
                    </li>
                    <li className={`${css.card} ${css.cardOrange}`}>
                        <Link to="/test/theory">
                            <h3>Testing theory</h3>
                            <GoArrowRight size={24} color="#fff" />
                        </Link>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default HomePage;
