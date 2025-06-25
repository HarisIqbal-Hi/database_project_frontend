import {Place} from "@/types/Place";


export function normalizePlace(raw: any) {
    console.log(raw);
    return {
        id: raw?.id as number,
        name: raw.name || raw.properties?.name || "",
        category: raw.category || raw.properties?.category || raw.properties?.tourism || "",
        latitude: raw.latitude,
        longitude: raw.longitude,
        address: raw.address || raw.properties?.address || raw.properties?.street || "",
        description: raw.description || raw.properties?.description || "",
        iconUrl: raw.iconUrl || undefined,
        footerImgUrl: raw.footerImgUrl || undefined,
        properties: raw.properties || {},
    };
}