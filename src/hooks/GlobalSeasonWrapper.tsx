"use client"

import {useEffect, useState} from "react";
import {useApiError} from "@/hooks/ErrorContext";
import {useRouter} from "next/navigation";
import styles from "./SessionExpiredDialog.module.scss";


export function GlobalSessionWatcher() {
    const { error, setError } = useApiError();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (error && error.includes("session")) {
            setOpen(true);
            // router.push("/");
        }
    }, [error]);
    const handleClose = () => {
        setError(null);

        setOpen(false);

        router.push("/");
    };

    if (!open) return null;
    return (
        <div className={styles.overlay}>
            <div className={styles.dialog}>
                <h2>Session Expired</h2>
                <p>Your session has expired. Please refresh to continue.</p>
                <button onClick={handleClose}>Login</button>
            </div>
        </div>
    );
}