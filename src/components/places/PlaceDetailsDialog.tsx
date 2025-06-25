import {Place} from "@/types/Place";
import styles from './PlaceDetailsDialog.module.scss';
import {capitalizeFirstWord} from "@/utils/text";
import {FavoriteButton} from "@/components/Favorite/FavoriteButton";
import {PlacePropertiesList} from "@/components/places/PlacePropertiesList";
import {useAddVisitedPlace, useVisitedPlaces} from "@/features/visited/hooks/useVisited";
import Image from "next/image";
import React from "react";

type Props = {
    open: boolean;
    onClose: () => void;
    place: Place;
};

export default function PlaceDetailsDialog({open, onClose, place}: Props) {
    const addVisited = useAddVisitedPlace();

    const { data: visitedPlaces } = useVisitedPlaces();
    const isVisited = visitedPlaces?.some(p => p.id === place.id);

    const handleClick = () => {
        addVisited.mutate(String(place.id));
    }

    console.log('isvisited', isVisited);
    if (!open || !place) return null;
    return (
        <div className={styles.backdrop} onClick={onClose}>
            <div className={styles.dialog} onClick={e => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>&times;</button>
                <Image src={`/icons/${place.category}.svg`} alt={place.category} width={110} height={110} />
                <div className={styles.placeName}>{place.name}</div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "10px"}}>
                    <FavoriteButton placeId={place.id}/>
                    <h4 className={styles.placeCategory}>{capitalizeFirstWord(place.category)}</h4>
                </div>
                {place.address && (
                    <h4 className={styles.placeAddress}>{place.address}</h4>
                )}
                {
                    place.website && (
                        <a
                            className={styles.website}
                            href={place.website.startsWith('http') ? place.website : `https://${place.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {place.website}
                        </a>
                    )
                }

                <div>
                    <h4 className={styles.information}>Information</h4>
                </div>
                {
                    place.properties &&
                    <PlacePropertiesList properties={place.properties} />
                }
                {
                    !isVisited ? (
                        <button onClick={handleClick} className={styles.visited_btn} type="submit" disabled={addVisited.isPending}>
                            {addVisited.isPending ? 'Logging in...' : 'Visited'}
                        </button>
                    ) :
                        <div style={{
                            marginTop:"1rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <h4 className={styles.visited_txt}>Added to your journey!</h4>
                        </div>
                }
            </div>
        </div>
    );
}
