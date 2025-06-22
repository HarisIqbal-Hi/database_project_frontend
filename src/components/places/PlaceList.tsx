'use client';

import styles from "./PlaceList.module.scss";
import {Place} from "@/types/Place";
import PlaceCard from "@/components/places/PlaceCard";

interface Props {
    places: Place[];
}

export default function PlaceList({ places }: Props) {
    return (
        <div className={`${styles.placesSide} ${styles.scrollArea}`} >
            {places.map(place => (
                <PlaceCard key={place.id} place={place} />
            ))}
        </div>
    );
}