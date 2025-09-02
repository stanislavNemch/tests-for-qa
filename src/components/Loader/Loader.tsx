import React from "react";
import styles from "./Loader.module.css";

const Loader: React.FC = () => (
    <div className={styles.loaderBackdrop}>
        <div className={styles.loader}></div>
    </div>
);

export default Loader;
