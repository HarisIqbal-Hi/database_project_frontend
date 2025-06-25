import React from "react";
import styles from "./Tabs.module.scss";

type TabValue = string | number;

interface TabItem {
    label: string;
    value: TabValue;
}

interface TabsProps {
    tabs: TabItem[];
    value: TabValue;
    onChange: (value: TabValue) => void;
    className?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, value, onChange, className }) => (
    <div className={`${styles.tabs} ${className ?? ""}`} role="tablist">
        {tabs.map(tab => (
            <div
                key={tab.value}
                className={`${styles.tab} ${value === tab.value ? styles.active : ""}`}
                onClick={() => onChange(tab.value)}
                role="tab"
                aria-selected={value === tab.value}
                tabIndex={0}
            >
                {tab.label}
            </div>
        ))}
    </div>
);

export default Tabs;