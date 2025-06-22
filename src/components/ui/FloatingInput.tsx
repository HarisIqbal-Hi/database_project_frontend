// components/ui/FloatingInput.tsx
import React, {ChangeEvent} from "react";
import styles from "./FloatingInput.module.scss";

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    value: string;
    error?: boolean;
    errorMsg?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function FloatingInput({ label, value,error,errorMsg, ...props }: FloatingInputProps) {
    const [focused, setFocused] = React.useState(false);

    return (
        <div className={styles.field}>
            <input
                className={styles.input}
                value={value}
                {...props}
                onFocus={e => { setFocused(true); props.onFocus?.(e); }}
                onBlur={e => { setFocused(false); props.onBlur?.(e); }}
                autoComplete={props.autoComplete}
            />
            <label
                className={
                    `${styles.label} ${(focused || value) ? styles.floated : ""}`
                }
            >
                {label}
            </label>
            {error && <div className="form-error">{errorMsg}</div>}
        </div>
    );
}
