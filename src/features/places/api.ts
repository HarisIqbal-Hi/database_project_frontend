import { apiFetcher } from "@/utils/apiFetcher";
import {Place} from "@/types/Place";

export async function fetchPlaces(params?: { categoryId?: string; search?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.categoryId) searchParams.append('categoryId', params.categoryId);
    if (params?.search) searchParams.append('search', params.search);

    const url = `/api/places${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
    const data = await apiFetcher<{ places: Place[] }>(url);
    console.log("places data",data.places[0].properties)
    return data.places
}

export const fetchPlaceById = async (id: string): Promise<Place> => {
    return apiFetcher<Place>(`/api/places/${id}`);
};