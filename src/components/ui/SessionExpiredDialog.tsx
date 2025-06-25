import React from "react";
import styles from "./SessionExpiredDialog.module.css";

interface Props {
    open: boolean;
    onRefresh: () => void;
}

const SessionExpiredDialog: React.FC<Props> = ({ open, onRefresh }) => {
    if (!open) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.dialog}>
                <h2>Session Expired</h2>
                <p>Your session has expired. Please refresh to continue.</p>
                <button onClick={onRefresh}>Refresh</button>
            </div>
        </div>
    );
};

export default SessionExpiredDialog;
