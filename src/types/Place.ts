// /src/types/place.ts
export interface Place {
    id: number;
    name: string;
    address: string;
    category_id: string;
    category: string;
    latitude: number;
    longitude: number;
    website?: string;
    properties?: Record<string, any>; // <-- This makes it flexible for any properties
    // Add other fields if present in backend
}