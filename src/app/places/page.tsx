'use client';

import {PlaceMap} from '@/components/PlaceMap/PlaceMap';
import {usePlaces} from "@/features/places/hooks/usePlaces";
import styles from "./PlacesPage.module.scss";
import FilterBar from "@/components/places/FilterBar";
import PlaceList from "@/components/places/PlaceList";
import Image from "next/image";
import React, {useEffect} from "react";
import EditProfileDialog from "@/components/user/EditProfileDialog";
import {useUserProfile} from "@/features/auth/hooks/useUserProfile"; // We'll make this

export default function PlacesPage() {
    const {data: places, isLoading} = usePlaces();
    const { data } = useUserProfile()
    const [openUserDialog, setOpenUserDialog] = React.useState(false);

    const handleUserDialog = () => {
        console.log('user dialog');
        setOpenUserDialog(!openUserDialog);
    }

    return (
        <div className={styles.root}>
            <header className={styles.header}>
                <h1>Cultural Places in Chemnitz</h1>
                <div className={styles.actions}>
                    <span className={styles.search_action}>
                        <Image className={`${styles.icon}`} src="/icons/search.svg" alt="search" width={36}
                               height={36}/>

                    </span>
                    <div className={styles.avatar} onClick={handleUserDialog}> {/* Avatar placeholder */}
                        <Image className={styles.icon} src={`/icons/user.svg`} alt="search" width={36} height={36}/>
                    </div>
                    {(openUserDialog && data) && (
                        <>

                        <EditProfileDialog onClose={handleUserDialog} open={openUserDialog} user={data.user}/>
                        </>
                    )}
                </div>
            </header>
            <div className={styles.body}>
                <div className={styles.mapArea}>
                    {isLoading ? (
                        <p>Loading map...</p>
                    ) : (
                        places && <PlaceMap places={places}/>
                    )}
                </div>
                <aside className={styles.sidebar}>
                    <FilterBar/>
                    <PlaceList places={places || []}/>
                </aside>
            </div>
        </div>
    );
}