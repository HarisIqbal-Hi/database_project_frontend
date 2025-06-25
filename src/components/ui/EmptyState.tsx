import styles from './EmptyState.module.scss';
import EmptyStateIcon from "@/components/ui/EmptyStateIcon";
import Image from "next/image"; // Create this file

interface IProps {
    imageSrc: string;
    text: string;
}

export default function EmptyState({ text, imageSrc }:IProps) {
    return (
        <div className={styles.emptyWrap}>
            <Image
                className={`${styles.icon}`}
                src={`/icons/${imageSrc}.svg`}
                alt={imageSrc}
                width={64}
                height={64}
                style={{ cursor: 'pointer' }}
            />
            <h1 className={styles.emptyText}>
                {text}
                {/*No places found. Try another filter!*/}
            </h1>
        </div>
    );
}