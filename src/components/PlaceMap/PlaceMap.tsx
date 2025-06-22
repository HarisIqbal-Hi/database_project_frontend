'use client';

import { APIProvider, InfoWindow, Map, Marker} from '@vis.gl/react-google-maps';
import {useEffect, useState} from 'react';
import {Place} from "@/types/Place";

type Props = { places: Place[] };
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
    }
};

export function PlaceMap({places}: Props) {
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        console.log(selectedPlace);
    },[selectedPlace]);

    return (

        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
            <Map
                mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}
                style={{width: '100vw', height: '100vh'}}
                defaultCenter={{lat: 22.54992, lng: 0}}
                defaultZoom={3}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
            >

                {places.map((place) => (
                    <Marker
                        key={place.id}
                        position={{ lat: place.latitude, lng: place.longitude }}
                        icon={categoryIcons[place.category] || categoryIcons.default}
                        onClick={() => setSelectedPlace(place)}
                    />
                ))}

                {selectedPlace && (
                    <InfoWindow
                        position={{
                            lat: selectedPlace.latitude,
                            lng: selectedPlace.longitude,
                        }}
                        onCloseClick={() => setSelectedPlace(null)}
                    >
                        <div>
                            <h4 style={{ margin: 0, color: 'black' }}>{selectedPlace.name}</h4>
                            <div style={{ fontSize: '0.98em', color: 'black' }}>{selectedPlace.category}</div>
                            {selectedPlace.address && <div style={{ fontSize: '0.95em', color: '#aaa' }}>{selectedPlace.address}</div>}
                        </div>
                    </InfoWindow>
                )}

            </Map>

        </APIProvider>
    )
        ;
}
