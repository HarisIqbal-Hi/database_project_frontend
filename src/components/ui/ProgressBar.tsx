import React from "react";
import styles from "./ProgressBar.module.scss";

type ProgressBarProps = {
    current: number;
    total: number;
};

export default function ProgressBar({ current, total }: ProgressBarProps) {
    const percent = Math.min((current / total) * 100, 100);

    return (
        <div className={styles.wrapper}>
            <div className={styles.label}>
                {current} / {total} to next level
            </div>
            <div className={styles.barBg}>
                <div
                    className={styles.barFill}
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
}
