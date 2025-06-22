import styles from "./PlaceCard.module.scss";
import {Place} from "@/types/Place";
import Image from "next/image";


interface PlaceCardProps {
    place: Place;
}
export default function PlaceCard({ place }: PlaceCardProps) {
    return (
        <div className={styles.card}>
            <Image className={`${styles.icon}`} src={`/icons/${place.category}.svg`} alt={place.category} width={36} height={36} />
            <div className={styles.info}>
                <div className={styles.name}>{place.name}</div>
                <div className={styles.category}>{place.category}</div>
                <div className={styles.address}>{place.address}</div>
            </div>
            <button className={styles.favoriteBtn}>
                ★
            </button>
        </div>
    );
}