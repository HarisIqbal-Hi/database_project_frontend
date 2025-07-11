import React from "react";
import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner = () => (
    <div className={styles.loaderContainer}>
        <div className={styles.spinner}></div>
    </div>
);

export default LoadingSpinner;