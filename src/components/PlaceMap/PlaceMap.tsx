'use client';

import { APIProvider, InfoWindow, Map, Marker} from '@vis.gl/react-google-maps';
import {useEffect, useState} from 'react';
import {Place} from "@/types/Place";
import ViewDetailsButton from "@/components/ui/ViewDetailsButton";
import Image from "next/image";
import styles from "@/components/places/PlaceCard.module.scss";
import {capitalizeFirstWord} from "@/utils/text";
import PlaceDetailsDialog from "@/components/places/PlaceDetailsDialog";
import {normalizePlace} from "@/utils/normalizePlace";

type Props = {
    places: Place[];
    userLocation?: { lat: number; lng: number } | null;
};
 // Chemnitz center
// You can tune colors to match your theme!
const categoryIcons: Record<string, any> = {
    museum: {
        path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
        fillColor: "#F4A259", // Warm orange for museum
        fillOpacity: 1,
        strokeColor: "#314352",
        strokeWeight: 2,
        scale: 2
    },
    restaurant: {
        path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
        fillColor: "#FF6F61", // Red/Coral for restaurant
        fillOpacity: 1,
        strokeColor: "#314352",
        strokeWeight: 2,
        scale: 2
    },
    theatre: {
        path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
        fillColor: "#845EC2", // Purple for theatre
        fillOpacity: 1,
        strokeColor: "#314352",
        strokeWeight: 2,
        scale: 2
    },
    artwork: {
        path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
        fillColor: "#FFC75F", // Gold for artwork
        fillOpacity: 1,
        strokeColor: "#314352",
        strokeWeight: 2,
        scale: 2
    },
    hotel: {
        path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
        fillColor: "#008F7A", // Teal for hotel
        fillOpacity: 1,
        strokeColor: "#314352",
        strokeWeight: 2,
        scale: 2
    },
    guest_house: {
        path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
        fillColor: "#B39CD0", // Soft lavender for guest house
        fillOpacity: 1,
        strokeColor: "#314352",
        strokeWeight: 2,
        scale: 2
    },
    gallery: {
        path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
        fillColor: "#4B6C7B", // Blue for gallery
        fillOpacity: 1,
        strokeColor: "#fff",
        strokeWeight: 2,
        scale: 2
    },
    default: {
        path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
        fillColor: "#C0C0C0",
        fillOpacity: 1,
        strokeColor: "#333",
        strokeWeight: 2,
        scale: 2
    },
    user: {
        path: "M16 8a8 8 0 1 1-8 8a8 8 0 0 1 8-8zm0 2a6 6 0 1 0 6 6a6 6 0 0 0-6-6zm0 2.8a3.2 3.2 0 1 1-3.2 3.2A3.2 3.2 0 0 1 16 12.8z",
        fillColor: "#4B6C7B",       // Your Chemnitz blue
        fillOpacity: 1,
        strokeColor: "#F8A948",     // Orange highlight ring
        strokeWeight: 3,
        scale: 1.6,
        anchor: { x: 16, y: 16 }
    }
};
export const ccsMapStyle = [
    {
        featureType: "all",
        elementType: "geometry",
        stylers: [{ color: "#F8E9C1" }] // Beige background
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#6E93A5" }] // Blue water
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#B5C6A4" }] // Green parks
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#FFEAB6" }] // Yellow roads
    },
    {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{ color: "#F8A948" }] // Orange points of interest
    },
    {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [{ color: "#4B6C7B" }] // Dark blue borders
    },
    {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [{ color: "#314352" }] // Dark text
    }
];

const testStyle = [
    { elementType: "geometry", stylers: [{ color: "#00ff00" }] }, // bright green
];
export function PlaceMap({ places, userLocation }: Props) {
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
                <Map
                    mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}
                    style={{ width: "100vw", height: "100vh" }}
                    defaultCenter={{ lat: 50.83, lng: 12.92 }}
                    defaultZoom={13}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    styles={testStyle}
                >
                    Place markers
                    {places.map((place) => (
                        <Marker
                            key={place.id}
                            position={{ lat: place.latitude, lng: place.longitude }}
                            icon={categoryIcons[place.category] || categoryIcons.default}
                            onClick={() => setSelectedPlace(place)}
                        />
                    ))}

                    {/* User location marker, if available */}
                    {userLocation && (
                        <Marker
                            position={userLocation}
                            icon={categoryIcons["user"] || categoryIcons.default}
                            title="Your Location"
                        />
                    )}

                    {/* InfoWindow as before */}
                    {selectedPlace && (
                        <InfoWindow
                            position={{
                                lat: selectedPlace.latitude,
                                lng: selectedPlace.longitude,
                            }}
                            onCloseClick={() => setSelectedPlace(null)}
                        >
                            <div>
                                <h4 style={{ margin: 0, color: 'black', fontSize:"1.5rem" }}>{selectedPlace.name}</h4>
                                <div style={{
                                    marginTop:".5rem",
                                    marginBottom:".5rem",
                                    display:"flex",
                                    alignItems:"center"
                                }}>
                                    <Image className={`${styles.icon}`} src={`/icons/${selectedPlace.category}.svg`} alt={selectedPlace.category} width={24} height={24} />
                                    <div style={{ fontSize: '1rem', color: 'black' }}>{capitalizeFirstWord(selectedPlace.category)}</div>
                                </div>
                                {selectedPlace.address && (
                                    <div style={{ fontSize: '0.95em', color: '#aaa' }}>
                                        {selectedPlace.address}
                                    </div>
                                )}
                                <ViewDetailsButton onClick={()=> {
                                    setOpen(true)
                                    console.log("selected place", selectedPlace)
                                }}/>
                            </div>
                        </InfoWindow>
                    )}
                </Map>
            </APIProvider>
            {
                selectedPlace && (
                    <PlaceDetailsDialog
                        open={open}
                        onClose={() => setOpen(false)}
                        place={selectedPlace}
                    />
                )
            }
        </>

    );
}
