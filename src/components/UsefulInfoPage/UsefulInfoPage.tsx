import css from "./UsefulInfoPage.module.css";

const UsefulInfoPage = () => {
    return (
        <div className={css.infoContainer}>
            <h2 className={css.title}>Useful Information</h2>
            <div className={css.infoSection}>
                <h3 className={css.sectionTitle}>Books</h3>
                <ul>
                    <li>
                        <a href="#">Book 1</a>
                    </li>
                    <li>
                        <a href="#">Book 2</a>
                    </li>
                    <li>
                        <a href="#">Book 3</a>
                    </li>
                </ul>
            </div>
            <div className={css.infoSection}>
                <h3 className={css.sectionTitle}>Resources</h3>
                <ul>
                    <li>
                        <a href="#">Resource 1</a>
                    </li>
                    <li>
                        <a href="#">Resource 2</a>
                    </li>
                    <li>
                        <a href="#">Resource 3</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default UsefulInfoPage;
