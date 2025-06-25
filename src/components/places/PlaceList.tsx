'use client';

import styles from "./PlaceList.module.scss";
import {Place} from "@/types/Place";
import PlaceCard from "@/components/places/PlaceCard";
import {FilterType} from "@/components/places/FilterBar";
import EmptyState from "@/components/ui/EmptyState";
import Image from "next/image";

interface Props {
    places: Place[];
    favorites: Place[]; // Array of favorite place ids
    // Array of visited place ids
    filterCategory: string
}

export default function PlaceList({places,filterCategory}: Props) {


    return (
        <div className={`${styles.placesSide} ${styles.scrollArea}`}>
            {
                places.length > 0 ?
                    places.map(place => (
                        <PlaceCard key={place.id} place={place}/>
                    )):
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                    }}>
                        <EmptyState text="No places found. Try another filter!" imageSrc={filterCategory}/>
                    </div>
            }
            {}
        </div>
    );
}