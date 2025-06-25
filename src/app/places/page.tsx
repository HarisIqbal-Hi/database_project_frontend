'use client';

import {PlaceMap} from '@/components/PlaceMap/PlaceMap';
import {usePlaces} from "@/features/places/hooks/usePlaces";
import styles from "./PlacesPage.module.scss";
import FilterBar from "@/components/places/FilterBar";
import PlaceList from "@/components/places/PlaceList";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import EditProfileDialog from "@/components/user/EditProfileDialog";
import {useUserProfile} from "@/features/auth/hooks/useUserProfile";
import {userInfo} from "node:os";
import {useFavorites} from "@/features/favorite/hooks/useFavorites";
import {useVisitedPlaces} from "@/features/visited/hooks/useVisited";
import {Place} from "@/types/Place";
import {useLogout} from "@/features/user/hooks/useLogout";
import {useRouter} from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner"; // We'll make this

export default function PlacesPage() {
    const router = useRouter();
    const {data: visitedPlaces, isPending:visitedLoading} = useVisitedPlaces();
    const logout = useLogout();
    const favorites = useFavorites();
    const {data: places, isPending} = usePlaces();
    const {data} = useUserProfile()
    const [openUserDialog, setOpenUserDialog] = React.useState(false);
    const [filter, setFilter] = useState<{ search: string; category: string }>({search: "", category: "all"});
    const [filtered, setFiltered] = useState<Place[]>([])
    const handleUserDialog = () => {
        console.log('user dialog', places);
        setOpenUserDialog(!openUserDialog);
    }

    useEffect(() => {
        if (!places) {
            setFiltered([]);
            return;
        }
        let result = places;

        // Filter by search term
        if (filter.search) {
            result = result.filter(place =>
                place.name?.toLowerCase().includes(filter.search.toLowerCase())
            );
        }

        // Filter by category
        if (filter.category === "favorite") {
            const favoritePlaceIds = favorites.data?.map(fav => String(fav.id)) ?? [];
            result = result.filter(place => favoritePlaceIds.includes(String(place.id)));
        } else if (filter.category === "visited") {
            const visitedIds = visitedPlaces?.map(p => String(p.id)) ?? [];
            result = result.filter(place => visitedIds.includes(String(place.id)));
        } else if (filter.category !== "all") {
            result = result.filter(place => place.category === filter.category);
        }
        setFiltered(result);
    }, [places, favorites.data, visitedPlaces, filter]);

    const handleLogoutEvent = async () => {
        logout.mutateAsync(undefined,{
            onSuccess: () => {
                router.push("/");
            }
        })
    }

    console.log("filtered", filtered);
    return (
        <>
            {
                visitedLoading &&
                <LoadingSpinner/>
            }
            <div className={styles.root}>

                <header className={styles.header}>
                    <h1>Cultural Places in Chemnitz</h1>
                    <div className={styles.actions}>
                        <div className={styles.avatar} onClick={handleUserDialog}> {/* Avatar placeholder */}
                            <Image className={styles.icon} src={`/icons/user.svg`} alt="search" width={36} height={36}/>
                        </div>
                        <span className={styles.search_action} onClick={handleLogoutEvent}
                              style={{cursor: isPending ? 'wait' : 'pointer'}}>
            {isPending ? (
                <span className={styles.spinner}/>
            ) : (
                <Image className={styles.icon} src="/icons/logout.svg" alt="Logout" width={36} height={36}/>
            )}
        </span>
                        {(openUserDialog && data) && (
                            <>

                                <EditProfileDialog onClose={handleUserDialog} open={openUserDialog} user={data.user}/>
                            </>
                        )}
                    </div>
                </header>
                <div className={styles.body}>
                    <div className={styles.mapArea}>
                        {isPending ? (
                            <p>Loading map...</p>
                        ) : (
                            (places && data) && <PlaceMap places={filtered} userLocation={data.user.location}/>
                        )}
                    </div>
                    <aside className={styles.sidebar}>
                        {
                            data?.user.interests &&
                            <FilterBar interests={data?.user.interests} onFilterChange={setFilter}/>
                        }
                        <PlaceList
                            places={places || []}
                            favorites={filtered}      // fetched from API or state
                            filterCategory={filter.category}         // fetched from API or state
                        />
                    </aside>
                </div>
            </div>
        </>
    );

}