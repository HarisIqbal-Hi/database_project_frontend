import styles from "./AchievementBadge.module.scss";
import {cn} from "@/utils/cn";
import Image from "next/image";
import ProgressBar from "@/components/ui/ProgressBar";

type Props = {
    icon: string;
    title: string;
    desc: string;
    value: number;
    progress?: number;
    goal?: number;
    total: number;
};

export default function AchievementBadge({
                                             icon, title, desc, value, progress, goal, total,
                                         }: Props) {
    return (
        <div className={styles.card}>
            <div className={styles.card__information}>
                <Image className={`${styles.icon}`} src={`/icons/${icon}.svg`} alt={"icon"} width={48} height={48}/>
                <div className={styles.info}>
                    <div className={styles.name}>{title}</div>
                    <div className={styles.desc}>{desc}</div>
                </div>
            </div>
            <ProgressBar current={value} total={total}/>
        </div>
    );
}