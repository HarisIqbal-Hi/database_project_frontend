import styles from "./PlaceCard.module.scss";
import {Place} from "@/types/Place";
import Image from "next/image";
import {FavoriteButton} from "@/components/Favorite/FavoriteButton";
import PlaceDetailsDialog from "@/components/places/PlaceDetailsDialog";
import {useState} from "react";


interface PlaceCardProps {
    place: Place;
}
export default function PlaceCard({ place }: PlaceCardProps) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <div className={styles.card} onClick={() => {
                setOpen(true);
            }}>
                <Image className={`${styles.icon}`} src={`/icons/${place.category}.svg`} alt={place.category} width={36} height={36} />
                <div className={styles.info}>
                    <div className={styles.name}>{place.name?.length > 15 ? place.name.slice(0,15) + "..." : place.name}</div>
                    <div className={styles.category}>{place.category}</div>
                    <div className={styles.address}>{place.address}</div>
                </div>
                <FavoriteButton placeId={place.id}/>
            </div>
            {
                place && (
                    <PlaceDetailsDialog
                        open={open}
                        onClose={() => setOpen(false)}
                        place={place}
                    />
                )
            }
        </>
    );
}