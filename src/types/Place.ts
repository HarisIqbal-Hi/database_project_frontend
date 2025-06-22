// /src/types/place.ts
export interface Place {
    id: string;
    name: string;
    description: string;
    address: string;
    category_id: string;
    category: string;
    imageUrl?: string;
    latitude: number;
    longitude: number;
    // Add other fields if present in backend
}