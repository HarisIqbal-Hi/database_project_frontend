import { apiFetcher } from "@/utils/apiFetcher";
import { Place } from "@/types/Place";

// Get all visited places
export async function fetchVisitedPlaces(): Promise<Place[]> {
    const data = await apiFetcher<{ places: Place[] }>("/api/visited");
    return data.places;
}

// Add a place as visited
export async function addVisitedPlace(placeId: string) {
    return apiFetcher<{ success: boolean }>("/api/visited", {
        method: "POST",
        body: JSON.stringify({ placeId }),
    });
}

// Remove a place as visited
export async function removeVisitedPlace(placeId: string) {
    return apiFetcher<{ success: boolean }>("/api/visited", {
        method: "DELETE",
        body: JSON.stringify({ placeId }),
    });
}
