import {useEffect, useState} from "react";
import styles from './FavoriteButton.module.scss';
import {useAddFavorite, useRemoveFavorite} from "@/features/places/hooks/useFavorite";
import {useFavorites} from "@/features/favorite/hooks/useFavorites"; // Or your global styles


type Props = {
    placeId: number;
};

export const FavoriteButton = ({ placeId }: Props) => {
    const { mutate: addFavorite, isPending: adding } = useAddFavorite();
    const { mutate: removeFavorite, isPending: removing } = useRemoveFavorite();
    const { data: favorites, isLoading } = useFavorites();

    // Compute favorite status from source of truth!
    const favoritePlaceIds = favorites?.map(fav => fav.id) ?? [];
    const isFavorite = favoritePlaceIds.includes(placeId);

    const toggleFavorite = (e: React.FormEvent) => {
        e.stopPropagation();
        if (isFavorite) {
            removeFavorite(placeId);
        } else {
            addFavorite(placeId);
        }
    };

    return (
        <button
            className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ""}`}
            type="button"
            disabled={adding || removing}
            aria-label={isFavorite ? "Unfavorite" : "Favorite"}
            onClick={toggleFavorite}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
            {isFavorite ? "★" : "☆"}
        </button>
    );
};