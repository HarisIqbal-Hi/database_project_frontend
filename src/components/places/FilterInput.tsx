import styles from "./FilterInput.module.scss";
import React, {ChangeEvent} from "react";
import FloatingInput from "@/components/ui/FloatingInput";
import Image from "next/image";

interface FilterInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder: string;
}

export default function FilterInput({value, onChange, placeholder = "Filter by category..."}: FilterInputProps) {
    return (
        <div className={styles.wrapper}>
          <span className={styles.icon}>
           <Image src={`/icons/search.svg`} alt="search" width={36} height={36} />
          </span>
            <input
                className={styles.input}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
}
