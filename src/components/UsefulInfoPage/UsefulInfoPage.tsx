import css from "./UsefulInfoPage.module.css";

const UsefulInfoPage = () => {
    return (
        <section className={`info ${css.infoPage}`}>
            <div className={css.container}>
                <div className={css.literatureSection}>
                    <h2 className={css.title}>Useful literature</h2>
                    <div className={css.divider}>
                        <svg width="150px" height="2">
                            <use xlinkHref="#divider-line" />
                        </svg>
                    </div>
                    <div className={css.infoSection}>
                        <ul className={css.list}>
                            <li>Testing dot.com Savin.</li>
                            <li>A mental hospital in the hands of patients.</li>
                            <li>Scrum. J. Sutherland.</li>
                        </ul>
                    </div>
                </div>
                <div className={css.infoSection}>
                    <h2 className={css.title}>Useful resources</h2>
                    <div className={css.divider}>
                        <svg width="150px" height="2">
                            <use xlinkHref="#divider-line" />
                        </svg>
                    </div>
                    <ul className={css.list}>
                        <li>
                            <a href="https://dou.ua">dou.ua</a>
                        </li>
                        <li>
                            <a href="https://habr.com">Habr</a>
                        </li>
                        <li>
                            <a href="https://facebook.com/">facebook.com/QA</a>
                        </li>
                        <li>
                            <a href="https://goit.ua">goit.ua</a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default UsefulInfoPage;
