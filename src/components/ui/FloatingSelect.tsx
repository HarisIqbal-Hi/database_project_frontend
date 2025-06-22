import React, {useRef, useState} from "react";
import styles from "./FloatingMultiSelect.module.scss";

type Option = { value: string; label: string };

interface Props {
    label: string;
    value: string[];
    options: Option[];
    onChange: (value: string[]) => void;
    placeholder?: string;
}

const FloatingMultiSelect: React.FC<Props> = ({label, value, options, onChange, placeholder}) => {
    const [input, setInput] = useState("");
    const [focused, setFocused] = useState(false);
    const wrapRef = useRef<HTMLDivElement>(null);
    const MAX_SELECTION = 3;
    const selectionFull = value.length >= MAX_SELECTION;
    // Hide options already selected
    const filteredOptions = options.filter(opt =>
        !value.includes(opt.value) && opt.label.toLowerCase().includes(input.toLowerCase())
    );

    // Hide dropdown when clicked outside
    React.useEffect(() => {
        const handler = (e: any) => {
            if (!wrapRef.current?.contains(e.target)) setFocused(false);
        };
        if (focused) document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [focused]);

    return (
        <>
            <div className={styles.selectWrap} ref={wrapRef}>
                {value.map(val => {
                    const option = options.find(o => o.value === val);
                    return (
                        <span className={styles.chip} key={val}>
                            {option?.label ?? val}
                            <button
                                className={styles.chipRemove}
                                onClick={() => onChange(value.filter(v => v !== val))}
                                type="button"
                                aria-label="Remove"
                            >×</button>
                        </span>
                    );
                })}
                <input
                    className={styles.input}
                    value={input}
                    placeholder={value.length ? "" : (placeholder || label)}
                    onChange={e => setInput(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setTimeout(() => setFocused(false), 150)}
                    disabled={selectionFull}
                />

                {focused && filteredOptions.length > 0 && (
                    <div className={`${styles.optionsList} ${styles.scrollArea}`}>
                        {filteredOptions.map(opt => (
                            <button
                                className={styles.option}
                                key={opt.value}
                                disabled={selectionFull}
                                style={{
                                    pointerEvents: selectionFull ? "none" : undefined,
                                    opacity: selectionFull ? 0.6 : 1,
                                }}
                                onMouseDown={e => e.preventDefault()}
                                onClick={() => {
                                    if (!selectionFull) {
                                        onChange([...value, opt.value]);
                                        setInput("");
                                    }
                                }}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            {selectionFull && (
                <div className={styles.maxInfo}>
                    You can only select up to 3 interests.
                </div>
            )}
        </>

    );
};

export default FloatingMultiSelect;
