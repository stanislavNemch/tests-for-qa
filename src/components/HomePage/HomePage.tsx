import css from "./HomePage.module.css";
// Header и Footer больше не импортируем и не рендерим здесь

const HomePage = () => {
    return (
        // Оставляем только основной контент страницы
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
                <div className={`${css.card} ${css.cardDark}`}>
                    <h3>QA technical training</h3>
                    <span className={css.arrow}>→</span>
                </div>
                <div className={`${css.card} ${css.cardOrange}`}>
                    <h3>Testing theory</h3>
                    <span className={css.arrow}>→</span>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
