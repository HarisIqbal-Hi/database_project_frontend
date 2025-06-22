import React, { useState } from "react";
import styles from "./FloatingInput.module.scss"; // reuse the same SCSS module!

type FloatingSelectProps = {
    label: string;
    value: string;
    options: { value: string; label: string }[];
    error?: boolean;
    errorMsg?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    [key: string]: any;
};

export default function FloatingSelect({
                                           label, value, options, error, errorMsg, onChange, ...props
                                       }: FloatingSelectProps) {
    const [focused, setFocused] = useState(false);

    return (
        <div className={styles.field}>
            <select
                className={styles.input}
                value={value}
                onChange={onChange}
                onFocus={e => { setFocused(true); props.onFocus?.(e); }}
                onBlur={e => { setFocused(false); props.onBlur?.(e); }}
                {...props}
            >
                <option value="" disabled hidden>
                    Select {label}
                </option>
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            <label
                className={`${styles.label} ${(focused || value) ? styles.floated : ""}`}
            >
                {label}
            </label>
            {error && <div className="form-error">{errorMsg}</div>}
        </div>
    );
}
